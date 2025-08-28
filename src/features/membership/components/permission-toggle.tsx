"use client";

import React, { useActionState } from "react";

import { LucideBan, LucideCheck } from "lucide-react";

import { togglePermission } from "../actions/update-permission";

import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";

type PermissionToggleProps = {
  userId: string;
  organizationId: string;
  permissionKey: "canDeleteTickets";
  permissionValue: boolean;
};

const PermissionToggle = ({
  userId,
  organizationId,
  permissionKey,
  permissionValue,
}: PermissionToggleProps) => {
  const [actionState, action] = useActionState(
    togglePermission.bind(null, { userId, organizationId, permissionKey }),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton
        variant={permissionValue ? "secondary" : "outline"}
        icon={permissionValue ? <LucideCheck /> : <LucideBan />}
        size="icon"
      />
    </Form>
  );
};

export default PermissionToggle;
