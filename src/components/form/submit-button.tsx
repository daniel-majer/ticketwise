"use client";

import React from "react";
import { useFormStatus } from "react-dom";

import { LucideLoaderCircle } from "lucide-react";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
};
const SubmitButton = ({ label, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full cursor-pointer py-4 text-white"
      disabled={pending}
    >
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? null : icon}
      {label}
    </Button>
  );
};

export default SubmitButton;
