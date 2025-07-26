import CardWrapper from "@/components/card-custom";
import EmailResendForm from "@/features/auth/components/email-resend-form";
import EmailVerificationForm from "@/features/auth/components/email-verification-form";

const EmailVerification = () => {
  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Verify Email"
        desc="Please verify your email to continue"
        content={
          <div className="space-y-2">
            <EmailVerificationForm />
            <EmailResendForm />
          </div>
        }
      />
    </>
  );
};

export default EmailVerification;
