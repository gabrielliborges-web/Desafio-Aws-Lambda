import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type ProdutoMaisVendido = {
  id: number;
  titulo: string;
  valor: number;
  qtdVendida: number;
  categoria: string;
  marca: string;
};

interface ProdutosMaisVendidosProps {
  produtos: ProdutoMaisVendido[];
}

const ProdutosMaisVendidos: React.FC<ProdutosMaisVendidosProps> = ({
  produtos,
}) => {
  const options = {
    title: {
      text: "Produtos Mais Vendidos",
      left: "start",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "value",
      name: "Qtd Vendida",
    },
    yAxis: {
      type: "category",
      data: produtos.map((produto) => produto.titulo),
      name: "Produtos",
      axisLabel: {
        formatter: (value: string) =>
          value.length > 15 ? value.substring(0, 15) + "..." : value,
      },
    },
    series: [
      {
        name: "Vendas",
        type: "bar",
        data: produtos.map((produto) => ({
          value: produto.qtdVendida,
          itemStyle: {
            color: "#2196F3",
          },
        })),
        label: {
          show: true,
          position: "right",
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

export default ProdutosMaisVendidos;
