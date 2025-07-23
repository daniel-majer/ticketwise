import React from "react";

import CardWrapper from "@/components/card-custom";
import PasswordForgotForm from "@/features/password/components/password-forgot-form";

const PasswordForgot = () => {
  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Forgot Password"
        desc="Email your email address to reset your password"
        content={<PasswordForgotForm />}
      />
    </>
  );
};

export default PasswordForgot;
