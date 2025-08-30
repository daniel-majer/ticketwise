"use client";

import { useParams, usePathname } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import { invitationsPath, membershipsPath } from "@/paths";

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ orgId: string }>();
  const pathname = usePathname();

  const title = {
    memberships: "Memberships" as const,
    invitations: "Invitations" as const,
  }[pathname.split("/").at(-1) as "memberships" | "invitations"];
  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organizations", href: "/organizations" },
        {
          title,
          dropdown: [
            {
              title: "Memberships",
              href: membershipsPath(params.orgId),
            },
            {
              title: "Invitations",
              href: invitationsPath(params.orgId),
            },
          ],
        },
      ]}
    />
  );
};

export default OrganizationBreadcrumbs;
