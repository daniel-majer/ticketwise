import { format } from "date-fns";
import { LucideTrash, LucideTriangleAlert } from "lucide-react";

import { getInvitations } from "../queries/get-invitation";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type InvitationListProps = {
  orgId: string;
};

const InvitationList = async ({ orgId }: InvitationListProps) => {
  const invitations = await getInvitations(orgId);

  if (!invitations.length) {
    return <Placeholder text="Nothing found" icon={<LucideTriangleAlert />} />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Invited At</TableHead>
          <TableHead>Invited By</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => {
          const deleteButton = (
            <>
              <Button
                variant="destructive"
                size="icon"
                className="cursor-pointer"
              >
                <LucideTrash className="h-4 w-4" />
              </Button>
            </>
          );

          const buttons = <>{deleteButton}</>;

          return (
            <TableRow key={invitation.email}>
              <TableCell>{invitation.email}</TableCell>
              <TableCell>
                {format(invitation.createdAt, "dd/MM/yyyy, HH:mm")}
              </TableCell>
              <TableCell>
                {invitation.invitedByUser
                  ? `${invitation.invitedByUser.username} (${invitation.invitedByUser.email})`
                  : "Deleted User"}
              </TableCell>
              <TableCell className="flex justify-end gap-x-2">
                {buttons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InvitationList;
