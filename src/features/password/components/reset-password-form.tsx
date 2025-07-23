"use client";

import React, { useActionState } from "react";

import { resetPassword } from "../actions/reset-password";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

type ResetPasswordFormProps = {
  tokenId: string;
};

const ResetPasswordForm = ({ tokenId }: ResetPasswordFormProps) => {
  const [actionState, action] = useActionState(
    resetPassword.bind(null, tokenId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Password"
        type="password"
        name="password"
        defaultValue={actionState?.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <Input
        placeholder="Confirm password"
        type="password"
        name="confirmPassword"
        defaultValue={actionState?.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Reset Password" />
    </Form>
  );
};

export default ResetPasswordForm;
