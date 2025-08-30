"use client";

import React, { useActionState } from "react";

import { acceptInvitation } from "../actions/accept-invitation";

import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";

const InvitationAcceptForm = ({ tokenId }: { tokenId: string }) => {
  const [actionState, action] = useActionState(
    acceptInvitation.bind(null, tokenId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton label="Accept" />
    </Form>
  );
};

export default InvitationAcceptForm;
