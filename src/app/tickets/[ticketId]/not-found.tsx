import React from "react";
import Link from "next/link";

import { LucideTriangleAlert } from "lucide-react";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { tickets } from "@/paths";

const NotFound = () => {
  return (
    <Placeholder
      icon={<LucideTriangleAlert />}
      text="Ticket not found"
      button={
        <Button variant={"outline"} asChild>
          <Link href={tickets()}>Go to Tickets</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
