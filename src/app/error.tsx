"use client";

import { LucideTriangleAlert } from "lucide-react";

import Placeholder from "@/components/placeholder";

const Error = ({ error }: { error: Error }) => {
  const message = error.message || "Something went wrong";

  return <Placeholder icon={<LucideTriangleAlert />} text={message} />;
};

export default Error;
