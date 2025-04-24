import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function usePlayers({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data: { data = [], total = 0 } = {}, error } =
        await actions.getPlayers({ limit, page: page + 1 });

      setPlayers(data);
      setError(error?.message);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { players, count, loading, error };
}
