import type { LeagueMatch } from "@/types";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useHistoricMatches({ leagueId }: { leagueId: string }) {
  const [matches, setMatches] = useState<LeagueMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data, error } = await actions.getHistoricMatches({ leagueId });

      if (data) {
        // TODO: quitar el dummy
        const dummyData = Array.from({ length: 10 }, (_, i) => data[0]);
        setMatches(dummyData);
      }

      setError(error?.message);
      setLoading(false);
    };
    fetch();
  }, []);

  return { matches, loading, error };
}
