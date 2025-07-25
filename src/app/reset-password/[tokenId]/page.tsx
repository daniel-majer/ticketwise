import CardWrapper from "@/components/card-custom";
import ResetPasswordForm from "@/features/password/components/reset-password-form";

type ResetPasswordProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const ResetPassword = async ({ params }: ResetPasswordProps) => {
  const { tokenId } = await params;

  return (
    <>
      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="New Password"
        desc="Enter a new password for your account"
        content={<ResetPasswordForm tokenId={tokenId} />}
      />
    </>
  );
};

export default ResetPassword;
