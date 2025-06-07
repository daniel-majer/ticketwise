import React from "react";

import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description: string;
};

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-10">
      <div className="px-2 py-4 md:px-4 md:py-8">
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="text-sm text-zinc-400 md:text-base">{description}</p>
      </div>
      <Separator />
    </div>
  );
};
