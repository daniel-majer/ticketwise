import React from "react";
import Link from "next/link";

import { LucideTriangleAlert } from "lucide-react";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { home } from "@/paths";

const NotFound = () => {
  return (
    <Placeholder
      icon={<LucideTriangleAlert />}
      text="Page not found"
      button={
        <Button variant={"outline"} asChild>
          <Link href={home()}>Go to homepage</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
