import React from "react";

import { ActionState } from "./utils";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  return (
    <span className="mb-2 inline-block text-red-500">
      {actionState.fieldErrors[name]?.[0]}
    </span>
  );
};

export default FieldError;
