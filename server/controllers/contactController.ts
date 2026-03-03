import { Request, Response, NextFunction } from 'express';
import { ContactFormSchema } from '../../shared/validators/contact.js';
import { sendContactEmail } from '../services/emailService.js';
import { prisma } from '../db/client.js';

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

    // 3. Request metadata
    const ipAddress = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
    const userAgent = req.headers['user-agent'] || '';

    console.log('📝 Contact form submission:', {
      name: data.name,
      email: data.email,
      ipAddress,
      attachment: file ? `${file.originalname} (${(file.size / 1024).toFixed(1)} KB)` : 'none',
    });

    // 4. Persist contact record
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        source: 'web',
        ipAddress,
        userAgent,
        status: 'pending',
      },
    });

    console.log('✅ Contact record saved to database:', contact.id);

    // 5. Build optional attachment payload and send email
    const attachment = file
      ? {
          buffer:       file.buffer,
          originalname: file.originalname,
          mimetype:     file.mimetype,
          size:         file.size,
        }
      : undefined;

    const emailResult = await sendContactEmail(data, { ipAddress, userAgent }, attachment);

    // 6. Success response
    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        contactId: contact.id,
        emailSent:  emailResult.success,
      },
    });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    next(error);
  }
};
