import React from "react";
import Link from "next/link";

import CardWrapper from "@/components/card-custom";
import SignInForm from "@/features/auth/components/sign-in-form";
import { signUpPath } from "@/paths";

const SignIn = () => {
  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Sign In"
        desc="Sign in to your account"
        content={<SignInForm />}
        footer={
          <>
            <Link
              href={signUpPath()}
              className="text-muted-foreground text-sm hover:underline"
            >
              Don&apos;t have an account?
            </Link>
            <Link
              href={signUpPath()}
              className="text-muted-foreground text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </>
        }
      />
    </>
  );
};

export default SignIn;
