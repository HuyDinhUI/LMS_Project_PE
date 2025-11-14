import { useState } from "react";

export const useSubmitLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async (callback: any) => {
    if (loading) return; // chống submit nhiều lần
    setLoading(true);
    try {
      await callback();
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoading };
};
