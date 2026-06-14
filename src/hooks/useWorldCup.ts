import { useState, useEffect } from "react";
import { fetchWorldCupData } from "../api/football";
import type { WorldCupData } from "../api/football";

export function useWorldCup() {
  const [data, setData] = useState<WorldCupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await fetchWorldCupData();
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erro ao carregar dados");
          setLoading(false);
        }
      }
    }

    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return { data, loading, error, refetch: () => fetchWorldCupData().then(setData) };
}
