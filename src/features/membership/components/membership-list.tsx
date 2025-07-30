import { format } from "date-fns";
import { LucideBan, LucideCheck } from "lucide-react";

import { getMemberships } from "../queries/get-memberships";

import MembershipDeleteButton from "./membership-delete-button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MembershipListProps = {
  orgId: string;
};

const MembershipList = async ({ orgId }: MembershipListProps) => {
  const memberships = await getMemberships(orgId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Verified Email</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map((membership) => {
          const buttons = (
            <>
              <MembershipDeleteButton
                orgId={orgId}
                userId={membership.userId}
              />
            </>
          );
          return (
            <TableRow key={membership.userId}>
              <TableCell>{membership.user.username}</TableCell>
              <TableCell>{membership.user.email}</TableCell>
              <TableCell>
                {format(membership.joinedAt, "dd/MM/yyyy, HH:mm")}
              </TableCell>
              <TableCell>
                {membership.user.emailVerified ? (
                  <LucideCheck />
                ) : (
                  <LucideBan />
                )}
              </TableCell>
              <TableCell>{membership.membershipRole}</TableCell>
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

export default MembershipList;
