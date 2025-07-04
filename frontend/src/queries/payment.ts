import { useMutation } from "@tanstack/react-query";
import { createPixPayment } from "../services/payment";

export const usePixPaymentMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const [err, data] = await createPixPayment();
      if (err) {
        throw err;
      }
      return data;
    },
  });
};
