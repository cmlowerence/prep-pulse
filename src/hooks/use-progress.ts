import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProgress() {
  const { data, error, isLoading } = useSWR('/api/user/progress', fetcher);

  const refreshProgress = () => {
    mutate('/api/user/progress');
  };

  return {
    progress: data || [],
    isLoading,
    isError: error,
    refreshProgress
  };
}
