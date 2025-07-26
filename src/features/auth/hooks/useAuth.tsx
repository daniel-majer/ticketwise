import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { User } from "@prisma/client";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data.user);
      setIsFetched(true);
    };

    fetchUser();
  }, [pathname]);

  return { user, isFetched };
};

export default useAuth;
