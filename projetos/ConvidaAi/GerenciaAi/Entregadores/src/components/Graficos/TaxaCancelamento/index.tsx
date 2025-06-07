import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type TaxaCancelamento = {
  dia: string;
  totalPedidos: number;
  cancelados: number;
};

interface TaxaCancelamentoProps {
  taxas: TaxaCancelamento[];
}

const TaxaCancelamento: React.FC<TaxaCancelamentoProps> = ({ taxas }) => {
  const data = taxas.map((taxa) => ({
    dia: taxa.dia,
    taxaCancelamento: ((taxa.cancelados / taxa.totalPedidos) * 100).toFixed(2),
  }));

  const options = {
    title: {
      text: "Taxa de Cancelamento de Pedidos",
      left: "start",
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}%",
    },
    xAxis: {
      type: "category",
      data: data.map((d) => d.dia),
      name: "Dia",
    },
    yAxis: {
      type: "value",
      name: "Taxa (%)",
    },
    series: [
      {
        name: "Taxa de Cancelamento",
        type: "line",
        data: data.map((d) => parseFloat(d.taxaCancelamento)),
        smooth: true,
        itemStyle: {
          color: "#F44336",
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c}%",
        },
        areaStyle: {
          color: "rgba(244, 67, 54, 0.2)",
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

export default TaxaCancelamento;
