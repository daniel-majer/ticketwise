"use client";

import React, { useActionState } from "react";

import { createOrganization } from "../actions/create-organization";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";

const OnboardingForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Name"
        name="name"
        defaultValue="The Road to Full-Stack"
      />
      <FieldError actionState={actionState} name="name" />

      <SubmitButton label="Create" />
    </Form>
  );
};

export default OnboardingForm;
