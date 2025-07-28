"use client";

import React, { useActionState } from "react";

import { switchOrganization } from "../actions/switch-organization";

import Form from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";

type OrganizationSwitchButtonProps = {
  trigger: React.ReactElement;
  orgId: string;
};

const OrganizationSwitchButton = ({
  orgId,
  trigger,
}: OrganizationSwitchButtonProps) => {
  const [actionState, action] = useActionState(
    switchOrganization.bind(null, orgId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      {trigger}
    </Form>
  );
};

export default OrganizationSwitchButton;
