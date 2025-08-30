"use client";

import { useActionState, useState } from "react";

import { LucidePlus } from "lucide-react";

import { createInvitation } from "../actions/create-invitation";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateInvitationButtonProps = {
  orgId: string;
};

const CreateInvitationButton = ({ orgId }: CreateInvitationButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [actionState, action] = useActionState(
    createInvitation.bind(null, orgId),
    EMPTY_ACTION_STATE,
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LucidePlus className="h-4 w-4" />
          <span>Create Invitation</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a user to join your organization.
          </DialogDescription>
        </DialogHeader>
        <Form
          action={action}
          actionState={actionState}
          handleSuccess={handleClose}
        >
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" />
              <FieldError actionState={actionState} name="email" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton label="Invite" />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvitationButton;
