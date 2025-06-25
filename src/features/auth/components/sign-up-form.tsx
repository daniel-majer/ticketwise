"use client";

import React, { useActionState } from "react";

import { signUp } from "../actions/signup";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Username"
        name="username"
        defaultValue={actionState?.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} name="username" />
      <Input
        placeholder="Email"
        name="email"
        defaultValue={actionState?.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />
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
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export default SignUpForm;
