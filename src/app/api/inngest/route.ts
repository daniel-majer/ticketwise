import { serve } from "inngest/next";

import { emailVerifyCodeEvent } from "@/features/auth/events/event-email-verify";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { inngest } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [passwordResetEvent, emailVerifyCodeEvent],
});
