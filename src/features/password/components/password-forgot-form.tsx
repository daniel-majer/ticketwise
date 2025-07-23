"use client";

import React, { useActionState } from "react";

import { passwordForgot } from "../actions/password-forgot";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

const PasswordForgotForm = () => {
  const [actionState, action] = useActionState(
    passwordForgot,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Email"
        name="email"
        // defaultValue={actionState?.payload?.get("email") as string}
        defaultValue="ptrhrvth@proton.me"
      />
      <FieldError actionState={actionState} name="email" />
      <SubmitButton label="Send Email" />
    </Form>
  );
};

export default PasswordForgotForm;
