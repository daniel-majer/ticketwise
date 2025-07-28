"use client";

import React, { cloneElement } from "react";
import { useFormStatus } from "react-dom";

import { LucideLoaderCircle } from "lucide-react";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement<{ className?: string }>;
  variant?:
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
};
const SubmitButton = ({ label, icon, variant }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={variant}
      type="submit"
      className="w-full cursor-pointer text-white"
      disabled={pending}
    >
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : icon ? (
        <>{cloneElement(icon, { className: "h-4 w-4" })}</>
      ) : null}
      {label}
    </Button>
  );
};

export default SubmitButton;
