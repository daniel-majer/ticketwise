import { useEffect } from "react";

import { ActionState } from "../utils";

export type OnArgs = { actionState: ActionState };

type Toast = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export const useToast = (actionState: ActionState, options: Toast) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") options.onSuccess?.({ actionState });
    if (actionState.status === "ERROR") options.onError?.({ actionState });
  }, [actionState, options]);
};
