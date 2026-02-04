import { ContactFormData } from "../../shared/types/contact.js";

export const sendContactEmail = async (data: ContactFormData) => {
  // 暂时使用 console.log 模拟发送邮件
  console.log("📧 Sending contact email:", data);

  // TODO: 实现真实的邮件发送逻辑（nodemailer 等）
  // 可以使用环境变量中的 SMTP 配置

  return { success: true };
};
