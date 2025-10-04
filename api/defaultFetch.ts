"use client";
import { useEffect, useState } from "react";

export function defaultFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetcher();
        setData(result);
        console.log(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [fetcher]);

  return { data, loading, error };
}
