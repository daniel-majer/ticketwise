import React from "react";

import CardWrapper from "@/components/card-custom";
import OnboardingForm from "@/features/organizations/components/onboarding-form";

const OrganizationCreatePage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Create Organization"
        desc="Create a new organization for your team"
        content={<OnboardingForm />}
      />
    </div>
  );
};

export default OrganizationCreatePage;
