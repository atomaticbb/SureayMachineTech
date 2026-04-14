import { Request, Response, NextFunction } from "express";
import { CatalogDownloadSchema } from "../../shared/validators/catalogDownload.js";
import { prisma } from "../db/client.js";
import { sendCatalogDownloadNotification } from "../services/emailService.js";

export const submitCatalogDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = CatalogDownloadSchema.parse(req.body);

    const ip = (req.ip ?? req.socket.remoteAddress ?? "unknown").replace(
      /^::ffff:/,
      ""
    );

    await prisma.catalogDownload.create({
      data: {
        email: data.email,
        productId: data.productId ?? null,
        ipAddress: ip,
      },
    });

    // Fire-and-forget — don't block the download on email delivery
    sendCatalogDownloadNotification(data.email, data.productId).catch(
      () => void 0
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
