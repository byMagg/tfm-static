import type { Round } from "@/types";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useRound({ leagueId }: { leagueId: string }) {
  const [round, setRound] = useState<Round>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data, error } = await actions.getRound({ leagueId });

      if (data) {
        setRound(data);
      }

      setError(error?.message);
      setLoading(false);
    };
    fetch();
  }, []);

  return { round, loading, error };
}
