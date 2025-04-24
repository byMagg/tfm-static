import { leagueAdded } from "@/stores/leagueAdded";
import { useStore } from "@nanostores/react";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useLeagues({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [leagues, setLeagues] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const $leagueAdded = useStore(leagueAdded);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data: { data = [], total = 0 } = {}, error } =
        await actions.getLeagues({ limit, page });

      setLeagues(data);
      setCount(total);
      setLoading(false);
      setError(error?.message);

      leagueAdded.set(false);
    };
    fetch();
  }, [page, $leagueAdded]);

  return { leagues, count, loading, error };
}
