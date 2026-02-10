//fetchMovies
//fetchMovieDetails

import { useEffect, useState } from "react";

//useFetch(fetchMovies)

const useFetch = <T>(fetchFuntion: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFuntion();

      setData(result);
    } catch (err) {
      // @ts-ignore
      setError(err instanceof Error ? err : new Error("An Error Occured"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(()=> {
    if(autoFetch){
      fetchData()
    }
  },[])

  return {data , loading , error , refetch: fetchData , reset}
};

export default useFetch
