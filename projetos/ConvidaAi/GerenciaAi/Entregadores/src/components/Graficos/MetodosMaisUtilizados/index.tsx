import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type FormaPagamento = {
  metodo: string;
  quantidade: number;
};

interface FormasPagamentoProps {
  formas: FormaPagamento[];
}

const FormasPagamentoMaisUtilizadas: React.FC<FormasPagamentoProps> = ({
  formas,
}) => {
  const options = {
    title: {
      text: "Formas de Pagamento Mais Utilizadas",
      left: "start",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "bottom",
    },
    series: [
      {
        name: "Formas de Pagamento",
        type: "pie",
        radius: "50%",
        data: formas.map((forma) => ({
          name: forma.metodo,
          value: forma.quantidade,
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

export default FormasPagamentoMaisUtilizadas;
