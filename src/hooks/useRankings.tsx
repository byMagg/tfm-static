import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useRankings({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [rankings, setRankings] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data: { data = [], total = 0 } = {}, error } =
        await actions.getRankings({ limit, page });

      setRankings(data);
      setError(error?.message);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { rankings, count, loading, error };
}
