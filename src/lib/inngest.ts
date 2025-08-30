import { EventSchemas, Inngest } from "inngest";

import { EmailVerifyCodeEvent } from "@/features/auth/events/event-email-verify";
import { InvitationCreatedEventArgs } from "@/features/invitations/events/event-invitation-created";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/email.email-verify": EmailVerifyCodeEvent;
  "app/invitation.created": InvitationCreatedEventArgs;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "ticketwise-app",
  schemas: new EventSchemas().fromRecord<Events>(),
});
