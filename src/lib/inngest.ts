import { EventSchemas, Inngest } from "inngest";

import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "ticketwise-app",
  schemas: new EventSchemas().fromRecord<Events>(),
});
  