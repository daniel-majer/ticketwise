import React from "react";
import { useFormStatus } from "react-dom";

import { LucideLoaderCircle } from "lucide-react";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};
const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full cursor-pointer py-5 text-white"
      disabled={pending}
    >
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
};

export default SubmitButton;
