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
      className="w-full cursor-pointer py-4 text-white"
      disabled={pending}
    >
      {pending && (
        <LucideLoaderCircle
          className={clsx("h-4 w-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span>
          <span className={clsx({ "ml-2": !!label })}>
            {cloneElement(icon, { className: "h-4 w-4" })}
          </span>
          <span className="ml-2">{icon}</span>
        </span>
      ) : null}
    </Button>
  );
};

export default SubmitButton;
