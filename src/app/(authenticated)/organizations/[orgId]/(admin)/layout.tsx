import React from "react";

import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

const AdminLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    orgId: string;
  }>;
}>) => {
  const { orgId } = await params;

  await getAdminOrRedirect(orgId);

  return <>{children}</>;
};

export default AdminLayout;
