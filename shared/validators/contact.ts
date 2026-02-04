import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(50, '姓名最多50个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().optional(),
  company: z.string().max(100, '公司名称最多100个字符').optional(),
  message: z.string().min(10, '消息至少10个字符').max(1000, '消息最多1000个字符'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
