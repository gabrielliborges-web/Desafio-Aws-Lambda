import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type VendaPorHora = {
  hora: string;
  valor: number;
};

interface VendaPorHoraProps {
  vendas: VendaPorHora[];
}

const VendaPorHora: React.FC<VendaPorHoraProps> = ({ vendas }) => {
  const options = {
    title: {
      text: "Venda do Dia por Hora",
      left: "start",
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: R$ {c}",
    },
    xAxis: {
      type: "category",
      data: vendas.map((venda) => venda.hora),
      name: "Hora",
    },
    yAxis: {
      type: "value",
      name: "Valor (R$)",
    },
    series: [
      {
        name: "Vendas",
        type: "line",
        data: vendas.map((venda) => venda.valor),
        smooth: true,
        areaStyle: {},
        itemStyle: {
          color: "#2196F3",
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

export default VendaPorHora;
