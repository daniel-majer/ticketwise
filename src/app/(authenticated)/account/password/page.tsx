import React from "react";

import AccountTabs from "@/app/(authenticated)/account/_navigation/tabs";
import { Heading } from "@/components/heading";

const AccountPassword = () => {
  return (
    <div>
      <Heading
        title="Password"
        description="All your password information"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default AccountPassword;
