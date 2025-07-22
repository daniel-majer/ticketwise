import {
  cloneElement,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

import { OnArgs, useToast } from "./form/hooks/useToast";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils";
import { Button } from "./ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DialogProps = {
  trigger:
    | React.ReactElement<{ onClick?: () => void }>
    | ((isPending: boolean) => React.ReactElement<{ onClick?: () => void }>);
  action: () => Promise<ActionState>;
  onSuccess?: (actionState: ActionState) => void;
  title?: string;
  description?: string;
};

const useConfirmDialog = ({
  trigger,
  action,
  onSuccess,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

  const dialogTrigger = cloneElement(
    typeof trigger === "function" ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen((state) => !state),
    },
  );
  
  const toastRef = useRef<number | string | null>(null);

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading("Deleting...");
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending]);

  const options = useMemo(
    () => ({
      onSuccess: (onArgs: OnArgs) => {
        if (onArgs.actionState.message) {
          toast.success(onArgs.actionState.message);
        }
        onSuccess?.(actionState);
      },
      onError: (onArgs: OnArgs) => {
        if (onArgs.actionState.message) {
          toast.error(onArgs.actionState.message);
        }
      },
    }),
    [actionState, onSuccess],
  );

  useToast(actionState, options);

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit" className="text-white">
                Confirm
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog] as const;
};

export { useConfirmDialog };
