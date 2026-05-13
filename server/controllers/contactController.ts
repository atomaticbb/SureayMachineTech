import { Request, Response, NextFunction } from "express";
import { fileTypeFromBuffer } from "file-type";
import { ContactFormSchema } from "../../shared/validators/contact.js";
import { sendContactEmail } from "../services/emailService.js";
import { prisma } from "../db/client.js";

// PDF と DWG のみ magic bytes が既知。DXF / STEP / STP はテキスト形式なので undefined が正常。
const BINARY_EXT_MIMES: Record<string, string> = {
  pdf: "application/pdf",
  dwg: "image/vnd.dwg",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validate text fields (multer places multipart text fields in req.body)
    const data = ContactFormSchema.parse(req.body);

    // 2. Optional file attachment — populated by multer upload.single('attachment')
    const file = req.file as Express.Multer.File | undefined;

    // 3. Magic bytes validation — prevent renamed executables
    if (file) {
      const detected = await fileTypeFromBuffer(file.buffer);
      const ext = file.originalname.split(".").pop()?.toLowerCase() ?? "";
      const expected = BINARY_EXT_MIMES[ext];

      if (expected) {
        // Binary format: magic bytes must match expected MIME
        if (!detected || detected.mime !== expected) {
          return res
            .status(400)
            .json({
              success: false,
              message: "File content does not match its declared extension.",
            });
        }
      } else if (detected) {
        // Text-based format (dxf / step / stp): file-type should return undefined.
        // If it detected a binary signature, the file is not what it claims to be.
        return res
          .status(400)
          .json({
            success: false,
            message: "File content does not match its declared extension.",
          });
      }
    }

    // 4. Request metadata
    const ipAddress = (req.ip ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress) as string;
    const userAgent = req.headers["user-agent"] || "";

    console.log("📝 Contact form submission:", {
      name: data.name,
      email: data.email,
      ipAddress,
      attachment: file
        ? `${file.originalname} (${(file.size / 1024).toFixed(1)} KB)`
        : "none",
    });

    // 4. Persist contact record
    const contact = await prisma.contact.create({
      data: {
        name: data.name ?? "—",
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        inquiryType: data.inquiryType ?? null,
        attachmentName: file?.originalname ?? null,
        attachmentSize: file?.size ?? null,
        source: "web",
        ipAddress,
        userAgent,
        status: "pending",
      },
    });

    console.log("✅ Contact record saved to database:", contact.id);

    // 5. Build optional attachment payload and send email
    const attachment = file
      ? {
          buffer: file.buffer,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        }
      : undefined;

    const emailResult = await sendContactEmail(
      data,
      { ipAddress, userAgent },
      attachment
    );

    // 6. Success response
    res.json({
      success: true,
      message: emailResult.success
        ? "Contact form submitted successfully"
        : "Inquiry received and saved. If your request is urgent, please contact us by email or WhatsApp.",
      data: {
        contactId: contact.id,
        emailSent: emailResult.success,
      },
    });
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    next(error);
  }
};
