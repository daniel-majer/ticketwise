"use client";

import { useActionState, useRef } from "react";

import { Ticket } from "@prisma/client";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import { DatePicker } from "@/components/form/date-picker";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
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

  const datePickerImperativeHandle = useRef<{ reset: () => void }>(null);

  const handleSuccess = () => {
    datePickerImperativeHandle.current?.reset();
  };

  return (
    <Form
      action={action}
      actionState={actionState}
      handleSuccess={handleSuccess}
    >
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

      <div className="flex gap-2">
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            name="deadline"
            imperativeHandleRef={datePickerImperativeHandle}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            id="bounty"
            name="bounty"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ?? ticket?.bounty
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};

export { CreateUpdateForm };
