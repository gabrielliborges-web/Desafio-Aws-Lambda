import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type FaturamentoPorDia = {
  dia: string;
  faturamento: number;
};

interface FaturamentoPorDiaProps {
  faturamentos: FaturamentoPorDia[];
}

const FaturamentoPorDia: React.FC<FaturamentoPorDiaProps> = ({
  faturamentos,
}) => {
  const options = {
    title: {
      text: "Faturamento por Dia",
      left: "start",
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: R$ {c}",
    },
    xAxis: {
      type: "category",
      data: faturamentos.map((faturamento) => faturamento.dia),
      name: "Dia",
    },
    yAxis: {
      type: "value",
      name: "Faturamento (R$)",
    },
    series: [
      {
        name: "Faturamento",
        type: "bar",
        data: faturamentos.map((faturamento) => faturamento.faturamento),
        itemStyle: {
          color: "#4CAF50",
        },
        label: {
          show: true,
          position: "top",
          formatter: "R$ {c}",
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

export default FaturamentoPorDia;
