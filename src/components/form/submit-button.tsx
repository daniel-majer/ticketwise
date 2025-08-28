"use client";

import React, { cloneElement } from "react";
import { useFormStatus } from "react-dom";

import clsx from "clsx";
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
    | "ghost";
  size?: "icon" | "sm" | "lg" | "default";
};

const SubmitButton = ({ label, icon, variant, size }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      size={size}
      variant={variant}
      type="submit"
      className={clsx("cursor-pointer text-white", {
        "w-full": !size,
      })}
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
