"use client";

import React, { useActionState } from "react";

import { passwordChange } from "../actions/password-change";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

const PasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    passwordChange,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Password"
        name="password"
        type="password"
        defaultValue="password"
      />
      <FieldError actionState={actionState} name="email" />
      <SubmitButton label="Send Email" />
    </Form>
  );
};

export default PasswordChangeForm;
