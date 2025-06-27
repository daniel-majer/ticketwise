import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { signInPath } from "@/paths";

export const getAuthOrRedirect = async () => {
  const { user } = await getAuth();

  if (!user) return redirect(signInPath());

  return { user };
};
