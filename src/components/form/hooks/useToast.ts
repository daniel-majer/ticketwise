import { useEffect, useRef } from "react";

import { ActionState } from "../utils";

export type OnArgs = { actionState: ActionState };

type Toast = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export const useToast = (actionState: ActionState, options: Toast) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") options.onSuccess?.({ actionState });
    if (actionState.status === "ERROR") options.onError?.({ actionState });

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options, isUpdate]);
};
