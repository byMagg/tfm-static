import type { LeagueMatch } from "@/types";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useLeagueMatch({ id }: { id: string }) {
  const [match, setMatch] = useState<LeagueMatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data, error } = await actions.getLeagueMatchById({ id });

      if (data) {
        setMatch(data);
      }

      setError(error?.message);
      setLoading(false);
    };
    fetch();
  }, []);

  return { match, loading, error };
}
