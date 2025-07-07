"use client";

import React, { useActionState } from "react";

import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { ActionState, EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Textarea } from "@/components/ui/textarea";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>,
  ) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form
      actionState={actionState}
      action={action}
      handleSuccess={handleSuccess}
    >
      <Textarea name="content" className="mb-4" />
      <FieldError name="content" actionState={actionState} />
      <SubmitButton label="Create comment" />
    </Form>
  );
};

export default CommentCreateForm;
