import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type TempoMedioEntrega = {
  dia: string;
  tempoMedio: number;
};

interface TempoMedioEntregaProps {
  tempos: TempoMedioEntrega[];
}

const TempoMedioEntrega: React.FC<TempoMedioEntregaProps> = ({ tempos }) => {
  const options = {
    title: {
      text: "Tempo Médio de Entrega",
      left: "start",
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c} minutos",
    },
    xAxis: {
      type: "category",
      data: tempos.map((tempo) => tempo.dia),
      name: "Dia",
    },
    yAxis: {
      type: "value",
      name: "Tempo Médio (min)",
    },
    series: [
      {
        name: "Tempo Médio",
        type: "line",
        data: tempos.map((tempo) => tempo.tempoMedio),
        smooth: true,
        areaStyle: {
          color: "rgba(255, 87, 34, 0.3)", // Laranja translúcido
        },
        itemStyle: {
          color: "#FF5722", // Laranja
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c} min",
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

export default TempoMedioEntrega;
