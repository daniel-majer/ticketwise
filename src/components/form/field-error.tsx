import React from "react";

import { ActionState } from "./utils";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  return (
    <p className="text-xs text-red-500">{actionState.fieldErrors[name]?.[0]}</p>
  );
};

export default FieldError;
