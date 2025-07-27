import React from "react";

import CardWrapper from "@/components/card-custom";
import OnboardingForm from "@/features/organizations/components/onboarding-form";

const Onboarding = () => {
  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Create Organization"
        desc="Create an organization to get started"
        content={<OnboardingForm />}
      />
    </>
  );
};

export default Onboarding;
