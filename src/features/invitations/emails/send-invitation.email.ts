import EmailInvitationTemplate from "@/emails/invitation/email-invitation";
import { resend } from "@/lib/resend";

export const sendEmailInvitation = async (
  email: string,
  username: string,
  url: string,
  orgName: string,
) => {
  return await resend.emails.send({
    from: "no-reply@dmajer.com",
    to: email,
    subject: "Invitation to Ticketwise!",
    react: EmailInvitationTemplate({
      fromUser: username,
      fromOrganization: orgName,
      url,
    }),
  });
};
