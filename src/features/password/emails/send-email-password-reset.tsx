import EmailPasswordTemplate from "@/emails/password/email-password-template";
import { resend } from "@/lib/resend";

export const sendEmailPasswordReset = async (
  email: string,
  passwordLink: string,
) => {
  return await resend.emails.send({
    from: "no-reply@dmajer.com",
    to: email,
    subject: "Hello world",
    react: <EmailPasswordTemplate passwordLink={passwordLink} />,
  });
};
