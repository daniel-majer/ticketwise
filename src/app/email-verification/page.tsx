import CardWrapper from "@/components/card-custom";
import EmailVerificationForm from "@/features/auth/components/email-verification-form";

const EmailVerification = () => {
  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Verify Email"
        desc="Please verify your email to continue"
        content={
          <div>
            <EmailVerificationForm />
            <EmailVerificationForm />
          </div>
        }
      />
    </>
  );
};

export default EmailVerification;
