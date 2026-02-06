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
    // 1. 验证数据
    const data = ContactFormSchema.parse(req.body);

    // 2. 获取请求元数据
    const ipAddress = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
    const userAgent = req.headers['user-agent'] || '';

    console.log('📝 Contact form submission:', {
      name: data.name,
      email: data.email,
      ipAddress,
    });

    // 3. 保存联系记录到数据库
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

    // 4. 发送邮件通知
    const emailResult = await sendContactEmail(data, { ipAddress, userAgent });

    // 5. 返回成功响应
    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        contactId: contact.id,
        emailSent: emailResult.success,
      },
    });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    next(error);
  }
};
