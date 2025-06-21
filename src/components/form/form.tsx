"use client";

import { ReactNode, useMemo } from "react";

import { toast } from "sonner";

import { OnArgs, useToast } from "./hooks/useToast";
import { ActionState } from "./utils";

type FormProps = {
  children: ReactNode;
  action: (payload: FormData) => void;
  actionState: ActionState;
};

const Form = ({ children, action, actionState }: FormProps) => {
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
    <form className="space-y-2" action={action}>
      {children}
    </form>
  );
};

export default Form;
