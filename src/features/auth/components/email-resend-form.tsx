"use client";

import { useActionState } from "react";

import { emailResend } from "../actions/email-resend";

import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";

const EmailResendForm = () => {
  const [actionState, action] = useActionState(emailResend, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton label="Resend Code" variant="ghost" />
    </Form>
  );
};

export default EmailResendForm;
