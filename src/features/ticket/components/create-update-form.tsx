"use client";

import { useActionState, useMemo } from "react";

import { Ticket } from "@prisma/client";
import { toast } from "sonner";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import { OnArgs, useToast } from "@/components/form/hooks/useToast";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";

type CreateUpdateFormProps = {
  ticket?: Ticket;
};

const CreateUpdateForm = ({ ticket }: CreateUpdateFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const options = useMemo(
    () => ({
      onSuccess: (onArgs: OnArgs) => {
        if (onArgs.actionState.message) {
          toast.success(onArgs.actionState.message);
        }
      },
      onError: (onArgs: OnArgs) => {
        if (onArgs.actionState.message) {
          toast.error(onArgs.actionState.message);
        }
      },
    }),
    [],
  );

  useToast(actionState, options);

  return (
    <Form action={action}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};

export { CreateUpdateForm };
