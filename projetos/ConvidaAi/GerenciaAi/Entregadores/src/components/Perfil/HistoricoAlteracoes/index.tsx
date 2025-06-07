"use client";

import { AuthContext } from "@/src/contexts/AuthContext";
import React, { useContext } from "react";
import imgNotFound from "../../../../assets/SemFoto.png";
import Image from "next/image";

export default function HistoricoAlteracoes() {
  let { user } = useContext(AuthContext);

  function getDateBadgeColor(dateString: string) {
    const updatedAt = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "bg-green-100 text-green-800";
    if (diffInDays < 15) return "bg-yellow-100 text-yellow-800";
    if (diffInDays <= 30) return "bg-blue-100 text-blue-800";
    return "bg-red-100 text-red-800";
  }

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Histórico de Alterações
      </h2>
      <div className="relative border-l-2 border-gray-200 pl-6">
        {user?.logs?.map((log) => {
          const dateColor = getDateBadgeColor(log.criado_em);

          return (
            <div
              key={log.id}
              className="relative mb-6 ml-2 p-3 rounded-md border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -left-2 top-4 w-3 h-3 bg-blue-500 border-2 border-white rounded-full shadow"></div>

              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={
                    log?.Usuario?.imagem_perfil
                      ? log?.Usuario?.imagem_perfil
                      : imgNotFound.src
                  }
                  alt="Imagem de Perfil"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <h5 className="flex-auto text-sm truncate font-semibold">
                  {log?.Usuario?.nome || "Sem Informações"}
                </h5>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-800 break-words max-w-full">
                  {log.acao}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${dateColor}`}
                >
                  {new Date(log.criado_em).toLocaleString()}
                </span>
              </div>

              {log?.acao?.includes("Atualização de usuário") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-medium text-gray-900">
                      Valor Anterior:
                    </span>{" "}
                    {log.valorAnterior || "N/A"}
                  </p>
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-medium text-gray-900">
                      Valor Atual:
                    </span>{" "}
                    {log.valorAtual}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
