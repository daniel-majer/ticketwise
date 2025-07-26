import EmailCodeTemplate from "@/emails/auth/email-verify-code-template";
import { resend } from "@/lib/resend";

export const emailVerifyCode = async (email: string, code: string) => {
  return await resend.emails.send({
    from: "no-reply@dmajer.com",
    to: email,
    subject: "Hello world",
    react: <EmailCodeTemplate code={code} />,
  });
};
