import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";

import { getOrganizations } from "../actions/get-organizations";

import OrganizationDeleteButton from "./organization-delete-button";
import OrganizationSwitchButton from "./organization-switch-button";

import SubmitButton from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrganizationListProps = {
  limitedAccess?: boolean;
};

const OrganizationList = async ({ limitedAccess }: OrganizationListProps) => {
  const organizations = await getOrganizations();

  const hasActive = organizations.some((org) => org.membershipByUser.isActive);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Members</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org) => {
          const isActive = org.membershipByUser.isActive;

          const switchButton = (
            <OrganizationSwitchButton
              orgId={org.id}
              trigger={
                <SubmitButton
                  icon={<LucideArrowLeftRight size={16} />}
                  label={
                    !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                  }
                  variant={
                    !hasActive ? "secondary" : isActive ? "default" : "outline"
                  }
                />
              }
            />
          );
          const detailButton = (
            <Button size="icon" variant="outline">
              <LucideArrowUpRightFromSquare size={16} />
            </Button>
          );
          const editButton = (
            <Button size="icon" variant="outline">
              <LucidePen size={16} />
            </Button>
          );
          const deleteButton = <OrganizationDeleteButton orgId={org.id} />;

          const buttons = (
            <>
              {switchButton}
              {limitedAccess ? null : detailButton}
              {limitedAccess ? null : editButton}
              {limitedAccess ? null : deleteButton}
            </>
          );

          return (
            <TableRow key={org.id}>
              <TableCell>{org.id}</TableCell>
              <TableCell>{org.name}</TableCell>
              <TableCell>
                {format(org.membershipByUser.joinedAt, "dd/MM/yyyy, HH:mm")}
              </TableCell>
              <TableCell>{org._count.memberships}</TableCell>
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

export default OrganizationList;
