"use client";

import React, { useActionState } from "react";

import { createComment } from "../actions/create-comment";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Textarea } from "@/components/ui/textarea";

const CommentCreateForm = ({ ticketId }: { ticketId: string }) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Textarea name="content" className="mb-4" />
      <FieldError name="content" actionState={actionState} />
      <SubmitButton label="Create comment" />
    </Form>
  );
};

export default CommentCreateForm;
