import { setUserLeagues, userLeagues } from "@/stores/userLeagues";
import { useStore } from "@nanostores/react";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useCheckPlayerInLeague() {
  const $userLeagues = useStore(userLeagues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data, error } = await actions.checkPlayerInLeague();

      if (data) {
        setUserLeagues(data);
      }

      setError(error?.message);
      setLoading(false);
    };
    fetch();
  }, []);

  return { leagues: $userLeagues, loading, error };
}
