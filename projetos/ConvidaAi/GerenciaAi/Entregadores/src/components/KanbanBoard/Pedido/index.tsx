import dayjs from "dayjs";
import * as React from "react";
// import dayjs from "dayjs";

interface PedidoCardProps {
  Pedido: any;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ Pedido }) => {
  const isLate = (dataPedido: string) => {
    if (!dataPedido) return false;
    const diffMinutes = dayjs().diff(dayjs(dataPedido), "minute");
    return diffMinutes > 30;
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="inline-flex items-center bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-md">
          Código: {(Pedido || {}).codigo_pedido}
        </span>
        <span
          className={`text-xs font-normal ${
            isLate((Pedido || {}).data_pedido)
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {dayjs((Pedido || {}).data_pedido).format("DD/MM/YYYY HH:mm") ||
            "Sem data"}
        </span>
      </div>

      <div className="mb-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Telefone:
          </span>{" "}
          {(Pedido || {}).cliente?.telefone || "—"}
        </p>
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Valor Total:
          </span>{" "}
          R$ {(Pedido || {}).valor_total}
        </p>
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Distância:
          </span>{" "}
          {(Pedido || {}).distancia} km
        </p>
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Tipo de Retirada:
          </span>{" "}
          {(Pedido || {}).tipo_retirada}
        </p>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 my-3" />

      <div className="flex justify-end items-center">
        <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-md">
          {`${(Pedido || {}).itensPedido?.length} ${
            (Pedido || {}).itensPedido?.length > 1 ? "Produtos" : "Produto"
          }`}
        </span>
      </div>
    </div>
  );
};

export default PedidoCard;
