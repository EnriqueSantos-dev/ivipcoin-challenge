import { useCallback } from "react";

import { toast, ToastOptions } from "react-hot-toast";

export function useToasty() {
  const success = useCallback((message: string, options?: ToastOptions) => {
    toast.success(message, options);
  }, []);

  const error = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, options);
  }, []);

  return {
    toast: {
      success,
      error,
    },
  };
}
