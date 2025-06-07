import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type Pedido = {
  id: number;
  codigo_pedido: string;
  data_pedido: Date;
  valor_total: number;
  status: "Pendente" | "Em Andamento" | "Enviado" | "Finalizado" | "Cancelado";
  entregadores_id?: number;
  cliente_id: number;
  metodo_pagamento_id: number;
  endereco_entrega_id: number;
  empreendimento_id: number;
  tipo: "BALCAO" | "DELIVERY";
};

type ChartData = {
  name: string;
  value: number;
};

interface PedidosPorStatusProps {
  pedidos: Pedido[];
}

const PedidosPorStatus: React.FC<PedidosPorStatusProps> = ({ pedidos }) => {
  const statusCounts = pedidos.reduce<Record<string, number>>((acc, pedido) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {});

  const chartData: ChartData[] = Object.entries(statusCounts).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  const colorMapping: Record<string, string> = {
    Pendente: "#FFC107",
    "Em Andamento": "#2196F3",
    Enviado: "#9C27B0",
    Finalizado: "#4CAF50",
    Cancelado: "#F44336",
  };

  const options = {
    title: {
      text: "Pedidos por Status",
      left: "start",
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}",
    },
    legend: {
      orient: "horizontal",
      top: "bottom",
    },
    xAxis: {
      type: "category",
      data: chartData.map((d) => d.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Pedidos",
        type: "bar",
        data: chartData.map((d) => ({
          name: d.name,
          value: d.value,
          itemStyle: {
            color: colorMapping[d.name],
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        className="mt-10"
        option={options}
        style={{ height: 400, width: "100%" }}
      />
    </div>
  );
};

export default PedidosPorStatus;
