import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type PedidoPorCanal = {
  canal: string;
  quantidade: number;
};

interface PedidosPorCanalProps {
  pedidos: PedidoPorCanal[];
}

const PedidosPorCanal: React.FC<PedidosPorCanalProps> = ({ pedidos }) => {
  const options = {
    title: {
      text: "Pedidos por Canal",
      left: "start",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      left: "bottom",
    },
    series: [
      {
        name: "Pedidos",
        type: "pie",
        radius: "50%",
        data: pedidos.map((pedido) => ({
          name: pedido.canal,
          value: pedido.quantidade,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          borderRadius: 5,
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: 400, width: "100%" }}
      className="mt-4"
    />
  );
};

export default PedidosPorCanal;
