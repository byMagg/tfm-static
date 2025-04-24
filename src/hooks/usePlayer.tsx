import { fetchWikidata } from "@/utils";
import { useEffect, useState } from "react";

export function usePlayer({ playerId }: { playerId: string }) {
  const [playerData, setPlayerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchWikidata("/entities/items/Q54544");
      setPlayerData(apiData);
      setLoading(false);
    };
    fetch();
  }, []);

  return { playerData, loading };
}
