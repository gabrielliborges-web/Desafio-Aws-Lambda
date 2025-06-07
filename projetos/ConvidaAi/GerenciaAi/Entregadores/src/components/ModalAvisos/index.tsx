"use client";

import { AuthContext } from "@/src/contexts/AuthContext";
import { exportarProdutosAlertaPDF } from "@/src/utils/PDF";
import { useContext, useState } from "react";

interface ProdutoOriginal {
  id: number;
  titulo: string;
  validade: string;
  qtd_produto: number;
  tipo_alerta: "vencimento" | "estoque_baixo";
  setor_armazenado: {
    id: number;
    titulo: string;
    descricao: string;
  };
  produtofornecedor: {
    fornecedor_id: number;
  }[];
}

export interface ModalAvisoProps {
  produtosVencimento: any[];
  produtosEstoqueBaixo: any[];
  produtos: any[];
  onClose: () => void;
}

export default function ModalAviso({
  produtosVencimento,
  produtosEstoqueBaixo,
  onClose,
  produtos,
}: ModalAvisoProps) {
  let { user } = useContext(AuthContext);

  return (
    <>
      {(produtosVencimento.length > 0 || produtosEstoqueBaixo.length > 0) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-2">
          <div className="bg-white p-6 shadow-xl w-full max-w-5xl border border-gray-300 max-h-[90vh] overflow-y-auto rounded-md">
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-800">
                ⚠️ Alertas de Produtos
              </h2>
              <button
                onClick={() => exportarProdutosAlertaPDF(produtos, user)}
                className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Exportar PDF
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {produtosVencimento.length > 0 && (
                <div className="flex-1 border-gray-200 lg:border-r pr-0 lg:pr-4 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  <h3 className="text-sm font-semibold text-red-600 mb-2">
                    🔴 Próximos do Vencimento
                  </h3>
                  <ul className="space-y-4">
                    {produtosVencimento.map((produto) => (
                      <li
                        key={produto.estoque.id}
                        className="p-3 border border-gray-200"
                      >
                        <p className="text-base font-medium text-gray-900">
                          {produto.produto.titulo}
                        </p>

                        <div className="flex items-center gap-2 text-sm mt-2 flex-wrap">
                          <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold">
                            Validade: {produto.estoque.validade?.split("T")[0]}
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 mt-2">
                          Qtd disponível: {produto.estoque.qtd_produto}
                        </p>

                        <div className="mt-3 text-sm bg-white border border-gray-200 p-3">
                          <p className="font-semibold text-gray-800 mb-2">
                            Setor:
                          </p>
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">
                              📍 {produto.produto.setor_armazenado?.titulo}
                            </p>
                            <p className="text-gray-700">
                              📝 {produto.produto.setor_armazenado?.descricao}
                            </p>
                          </div>
                        </div>

                        {user?.perfil_usuario !== "FUNCIONARIO" &&
                          produto.produto.produtoFornecedor?.length > 0 && (
                            <div className="mt-3 text-sm bg-white border border-gray-200 p-3">
                              <p className="font-semibold text-gray-800 mb-2">
                                Fornecedores:
                              </p>
                              <ul className="divide-y divide-gray-200">
                                {produto.produto.produtoFornecedor.map(
                                  (f: any, index: number) => (
                                    <li key={index} className="py-2">
                                      <p className="font-semibold text-gray-900">
                                        {f.fornecedor?.titulo || "-"}
                                      </p>
                                      <p className="text-gray-700 mt-1">
                                        📞{" "}
                                        <a
                                          href={`tel:${
                                            f.fornecedor?.telefone || ""
                                          }`}
                                          className="text-blue-600 hover:underline"
                                        >
                                          {f.fornecedor?.telefone || "-"}
                                        </a>
                                      </p>
                                      <p className="text-gray-700">
                                        📧{" "}
                                        <a
                                          href={`mailto:${
                                            f.fornecedor?.email || ""
                                          }`}
                                          className="text-blue-600 hover:underline break-all"
                                        >
                                          {f.fornecedor?.email || "-"}
                                        </a>
                                      </p>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {produtosEstoqueBaixo.length > 0 && (
                <div className="flex-1 pl-0 lg:pl-4 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  <>
                    <h3 className="text-sm font-semibold text-yellow-600 mb-2">
                      🟡 Estoque Baixo
                    </h3>
                    <ul className="space-y-4">
                      {produtosEstoqueBaixo.map((produto) => (
                        <li
                          key={produto.estoque.id}
                          className="p-3 border border-gray-200"
                        >
                          <p className="text-base font-medium text-gray-900">
                            {produto.produto.titulo}
                          </p>

                          <div className="flex items-center gap-2 text-sm mt-2 flex-wrap">
                            <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold">
                              Qtd: {produto.estoque.qtd_produto}
                            </span>
                          </div>

                          <div className="mt-3 text-sm bg-white border border-gray-200 p-3">
                            <p className="font-semibold text-gray-800 mb-2">
                              Setor:
                            </p>
                            <div className="space-y-1">
                              <p className="font-semibold text-gray-900">
                                📍 {produto.produto.setor_armazenado?.titulo}
                              </p>
                              <p className="text-gray-700">
                                📝 {produto.produto.setor_armazenado?.descricao}
                              </p>
                            </div>
                          </div>

                          {user?.perfil_usuario !== "FUNCIONARIO" &&
                            produto.produto.produtoFornecedor?.length > 0 && (
                              <div className="mt-3 text-sm bg-white border border-gray-200 p-3">
                                <p className="font-semibold text-gray-800 mb-2">
                                  Fornecedores:
                                </p>
                                <ul className="divide-y divide-gray-200">
                                  {produto.produto.produtoFornecedor.map(
                                    (f: any, index: number) => (
                                      <li key={index} className="py-2">
                                        <p className="font-semibold text-gray-900">
                                          {f.fornecedor?.titulo || "-"}
                                        </p>
                                        <p className="text-gray-700 mt-1">
                                          📞{" "}
                                          <a
                                            href={`tel:${
                                              f.fornecedor?.telefone || ""
                                            }`}
                                            className="text-blue-600 hover:underline"
                                          >
                                            {f.fornecedor?.telefone || "-"}
                                          </a>
                                        </p>
                                        <p className="text-gray-700">
                                          📧{" "}
                                          <a
                                            href={`mailto:${
                                              f.fornecedor?.email || ""
                                            }`}
                                            className="text-blue-600 hover:underline break-all"
                                          >
                                            {f.fornecedor?.email || "-"}
                                          </a>
                                        </p>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </li>
                      ))}
                    </ul>
                  </>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-800 text-white px-5 py-2 text-sm font-medium hover:bg-gray-700"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
