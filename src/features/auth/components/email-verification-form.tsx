"use client";

import React, { useActionState } from "react";

import { emailVerification } from "../actions/email-verification";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Code"
        name="code"
        // defaultValue={actionState?.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <SubmitButton label="Verify Email" />
    </Form>
  );
};

export default EmailVerificationForm;
