import React from "react";

import AccountTabs from "@/app/(authenticated)/account/_navigation/tabs";
import CardWrapper from "@/components/card-custom";
import { Heading } from "@/components/heading";
import PasswordChangeForm from "@/features/password/components/password-change-form";

const AccountPassword = () => {
  return (
    <div>
      <Heading
        title="Password"
        description="All your password information"
        tabs={<AccountTabs />}
      />

      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[420px] rounded-md"
        title="Change Password"
        desc="Enter your current password"
        content={<PasswordChangeForm />}
      />
    </div>
  );
};

export default AccountPassword;
