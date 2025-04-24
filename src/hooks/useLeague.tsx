import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useLeague({ id }: { id: string }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data: { data = [] } = {}, error } = await actions.getLeague({
        leagueId: id,
      });

      setLeague(data);
      setError(error?.message);
      setLoading(false);
    };
    fetch();
  }, []);

  return { league, loading, error };
}
