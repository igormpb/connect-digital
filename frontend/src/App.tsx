import { usePixPaymentMutation } from "./queries/payment";
import { toast } from "react-toastify";

function App() {
  const pixPaymentMutation = usePixPaymentMutation();

  const handlePayClick = () => {
    pixPaymentMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("QR Code gerado com sucesso! Agora é só pagar.", {
          autoClose: 5000,
          position: "top-right",
        });
      },
      onError: () => {
        toast.error("Erro ao gerar o QR Code. Tente novamente.", {
          autoClose: 5000,
          position: "top-right",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="p-6 max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Pagamento PIX</h1>

        {!pixPaymentMutation.data && (
          <>
            <button
              onClick={handlePayClick}
              className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition flex items-center justify-center text-lg font-semibold w-full"
              disabled={pixPaymentMutation.isPending}
            >
              {pixPaymentMutation.isPending ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Pagar com PIX"
              )}
            </button>
            <p className="mt-3 text-sm text-gray-600">
              Gere o QR Code para finalizar seu pedido.
            </p>
          </>
        )}

        {pixPaymentMutation.data && (
          <div className="mt-6">
            <img
              src={pixPaymentMutation.data.qr_code_image_base64}
              alt="QR Code PIX"
              className="mx-auto mb-4"
            />
            <p className="break-all text-sm bg-black text-white p-3 rounded-lg mb-2">
              {pixPaymentMutation.data.qr_code_copy_paste}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  pixPaymentMutation.data.qr_code_copy_paste
                );
                toast("Código PIX copiado para a área de transferência!", {
                  type: "info",
                });
              }}
              className="bg-black text-white text-sm py-2 px-4 rounded hover:bg-gray-800 transition mb-2"
            >
              Copiar PIX
            </button>
            <p className="text-sm text-gray-700">
              Agora é só pagar para finalizar o seu pedido.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
