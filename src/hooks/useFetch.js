import { useEffect } from "react";

export const useFetch = (url) => {
  useEffect(() => {
    const fetch = async () => {
      const res = await fetch(url);
      const data = await res.json();

      return data;
    };

    fetch(url);
  }, []);
};
