import React from "react";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await getAuthOrRedirect();

  return <>{children}</>;
};

export default AuthLayout;
