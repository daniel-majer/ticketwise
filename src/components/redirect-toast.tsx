"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "@/utils/cookies";

const RedirectToast = () => {
  const path = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, [path]);

  return null;
};

export default RedirectToast;
