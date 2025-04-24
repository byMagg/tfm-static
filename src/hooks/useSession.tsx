import { useEffect, useState } from "react";

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("__session"));
  }, []);

  return { isLoggedIn };
};
