import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic async-data hook. Handles loading / error / data state and guards
 * against setting state after unmount or after a newer request has started
 * (prevents race conditions when dependencies change quickly, e.g. fast
 * typing in a search box).
 *
 * @param {() => Promise<any>} fetcher - function returning a promise
 * @param {Array<any>} deps - dependency array, same semantics as useEffect
 * @returns {{ data: any, isLoading: boolean, error: Error|null, refetch: () => void }}
 */
export function useAsync(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const run = useCallback(() => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (requestId === requestIdRef.current) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (requestId === requestIdRef.current) {
          setError(err);
          setIsLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, isLoading, error, refetch: run };
}
