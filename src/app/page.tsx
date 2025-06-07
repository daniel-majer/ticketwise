import Link from "next/link";

import { Heading } from "@/components/heading";
import { tickets } from "@/paths";

export default function Home() {
  return (
    <div>
      <Heading title="Home" description="Your home place to start" />
      <Link
        href={tickets()}
        className="inline-block w-full md:text-lg text-center font-semibold underline"
      >
        Go to tickets
      </Link>
    </div>
  );
}
