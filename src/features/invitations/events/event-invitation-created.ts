import { sendEmailInvitation } from "../emails/send-invitation.email";

import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export type InvitationCreatedEventArgs = {
  data: {
    userId: string;
    organizationId: string;
    email: string;
    emailInvitationLink: string;
  };
};

export const invitationCreatedEvent = inngest.createFunction(
  {
    id: "invitation-created",
  },
  { event: "app/invitation.created" },
  async ({ event }) => {
    const { userId, organizationId, email, emailInvitationLink } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const organization = await prisma.organization.findUniqueOrThrow({
      where: { id: organizationId },
    });

    const result = await sendEmailInvitation(
      email,
      user.username,
      emailInvitationLink,
      organization.name,
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
