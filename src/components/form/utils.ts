import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const toErrorState = (err: unknown, formData: FormData): ActionState => {
  //validation error
  if (err instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      payload: formData,
      fieldErrors: err.flatten().fieldErrors,
      timestamp: Date.now(),
    };
    //another error e.g. database or server error
  } else if (err instanceof Error) {
    return {
      status: "ERROR",
      message: err.message,
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
    };
    //if something else crash
  } else {
    return {
      status: "ERROR",
      message: "Something went wrong!",
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
