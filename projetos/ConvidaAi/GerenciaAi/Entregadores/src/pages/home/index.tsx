import { GetServerSideProps } from "next";

import { Badge } from "@/src/components/badge";
import { StatData, EmpreendimentoProps } from "@/src/types/EmpreendimentoProps";
import dayjs from "dayjs";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";

export function Stat({
  title,
  value,
  change,
  dateCalc,
}: {
  title: string;
  value: string | number;
  change: string;
  dateCalc: string;
}) {
  return (
    <div className="p-4 bg-white shadow-md rounded-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="text-sm font-medium text-gray-600">{title}</div>
      <div className="mt-1 text-xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 flex items-center text-xs text-gray-500">
        <Badge color={change.startsWith("+") ? "lime" : "pink"}>{change}</Badge>
        <span className="ml-2">{dateCalc}</span>
      </div>
    </div>
  );
}

export default function Home({
  dadosDashboard,
}: {
  dadosDashboard: StatData[];
}) {
  let { user } = useContext(AuthContext);

  return (
    <div className="px-10">
      <ul
        role="list"
        className="divide-y divide-gray-200 dark:divide-gray-700 my-10"
      >
        {user?.perfil_usuario !== "FUNCIONARIO" && (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {dadosDashboard.map((stat, index) => (
              <Stat
                key={index}
                title={stat.title}
                value={stat.value}
                dateCalc={stat.dateCalc}
                change={stat.change}
              />
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dadosDashboard: StatData[] = [
    {
      title: "PEDIDOS RECEBIDOS",
      value: 240,
      change: "+30",
      dateCalc: "Mês anterior",
    },
    {
      title: "PEDIDOS ENTREGUES",
      value: 200,
      change: "+25",
      dateCalc: "Mês anterior",
    },
    {
      title: "FATURAMENTO TOTAL",
      value: 18250.75,
      change: "+R$1.200",
      dateCalc: "Mês anterior",
    },
    {
      title: "PRODUTOS ATIVOS",
      value: 47,
      change: "+3",
      dateCalc: "Última semana",
    },

    {
      title: "PRODUTOS EM PROMOÇÃO",
      value: 12,
      change: "+4",
      dateCalc: "Semana passada",
    },
  ];

  const { ["nextauthEntregador.token"]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dadosDashboard,
    },
  };
};
