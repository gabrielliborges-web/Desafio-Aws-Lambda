"use client";

import React from "react";

interface Log {
  id: number;
  usuarioId: number;
  acao: string;
  campo: string;
  valorAnterior: string | null;
  valorAtual: string | null;
  data: string;
  usuario: string; // Nome ou identificação do usuário
}

const mockLogs: Log[] = [
  {
    id: 1,
    usuarioId: 101,
    acao: "Atualização",
    campo: "Email",
    valorAnterior: "antigoemail@exemplo.com",
    valorAtual: "novoemail@exemplo.com",
    data: "2025-01-18T14:00:00",
    usuario: "Admin",
  },
  {
    id: 2,
    usuarioId: 102,
    acao: "Criação",
    campo: "Telefone",
    valorAnterior: null,
    valorAtual: "(11) 99999-8888",
    data: "2025-01-17T10:30:00",
    usuario: "Editor",
  },
  {
    id: 3,
    usuarioId: 103,
    acao: "Exclusão",
    campo: "CPF",
    valorAnterior: "123.456.789-00",
    valorAtual: null,
    data: "2025-01-16T16:00:00",
    usuario: "Moderador",
  },
];

export default function HistoricoAlteracoes() {
  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Histórico de Alterações
      </h2>
      <div className="relative border-l border-gray-300 pl-4">
        {mockLogs.map((log) => (
          <div
            key={log.id}
            className="ml-1 mb-6 p-3 rounded-sm border border-gray-300"
          >
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5"></div>

            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    log.acao === "Atualização"
                      ? "bg-yellow-100 text-yellow-700"
                      : log.acao === "Criação"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {log.acao}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(log.data).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Campo:</span> {log.campo}
                </p>
                <p>
                  <span className="font-semibold">Usuário:</span> {log.usuario}
                </p>
                <p>
                  <span className="font-semibold">Anterior:</span>{" "}
                  {log.valorAnterior || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Atual:</span>{" "}
                  {log.valorAtual || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
