import AccountTabs from "@/app/(authenticated)/account/_navigation/tabs";
import { Heading } from "@/components/heading";

const AccountProfile = () => {
  return (
    <div>
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default AccountProfile;
