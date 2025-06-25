"use client";

import React, { useActionState } from "react";

import { signIn } from "../actions/signin";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Email"
        name="email"
        defaultValue={actionState?.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        defaultValue={actionState?.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <SubmitButton label="Sign In" />
    </Form>
  );
};

export default SignInForm;
