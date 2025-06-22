import React from "react";
import Link from "next/link";

import CardWrapper from "@/components/card-custom";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { signUpPath } from "@/paths";

const SignUp = () => {
  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Sign Up"
        desc="Create a new account"
        content={<SignUpForm />}
        footer={
          <>
            <Link
              href={signUpPath()}
              className="text-muted-foreground text-sm hover:underline"
            >
              Have an account? Sign In now.
            </Link>
          </>
        }
      />
    </>
  );
};

export default SignUp;
