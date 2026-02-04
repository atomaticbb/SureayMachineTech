import { Request, Response, NextFunction } from 'express';
import { ContactFormSchema } from '../../shared/validators/contact.js';
import { sendContactEmail } from '../services/emailService.js';

export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = ContactFormSchema.parse(req.body);
    await sendContactEmail(data);
    
    res.json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    next(error);
  }
};
