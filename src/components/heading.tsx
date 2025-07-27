import React from "react";

import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description: string;
  tabs?: React.ReactNode;
  trigger?: React.ReactElement;
};

export const Heading = ({
  title,
  description,
  tabs,
  trigger,
}: HeadingProps) => {
  return (
    <>
      {tabs}
      <div className="flex items-center">
        <div className="w-full px-2 py-4 md:px-4 md:py-8">
          <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
          <p className="text-sm text-zinc-400 md:text-base">{description}</p>
        </div>
        <div className="flex gap-x-2">{trigger}</div>
      </div>
      <Separator className="mb-6" />
    </>
  );
};
