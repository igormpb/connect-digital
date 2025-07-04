import api from "./api";
import type { PaymentPixResponse } from "./response/payment";

export const createPixPayment = async () => {
  return await api.post<PaymentPixResponse>("/payments/pix");
};
