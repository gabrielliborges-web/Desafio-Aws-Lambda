"use client";

import React, { useState } from "react";
import { format } from "date-fns";

import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";

export interface AvisosImportantes {
  id: number;
  titulo: string;
  descricao: string;
  importancia: "baixa" | "media" | "alta";
  data_inicio: string;
  data_fim: string;
  confirmado?: boolean;
}

interface ModalAvisosImportantesProps {
  AvisosImportantes: AvisosImportantes[];
  onClose: () => void;
  onConfirm: (id: number) => void;
}

const coresImportancia: Record<AvisosImportantes["importancia"], string> = {
  baixa: "bg-white text-green-700 border border-green-500",
  media: "bg-white text-yellow-800 border border-yellow-500",
  alta: "bg-white text-red-700 border border-red-500",
};

export default function ModalAvisosImportantes({
  AvisosImportantes,
  onClose,
  onConfirm,
}: ModalAvisosImportantesProps) {
  const { user } = useContext(AuthContext);

  const [avisosConfirmados, setAvisosConfirmados] = useState<number[]>(
    AvisosImportantes.filter((a) => a.confirmado).map((a) => a.id)
  );

  const todosConfirmados =
    avisosConfirmados.length === AvisosImportantes.length;

  return (
    AvisosImportantes.length > 0 && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-4xl bg-white shadow-xl border border-gray-200 rounded-md p-6 space-y-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
            📢 Avisos Importantes
          </h2>

          <ul className="space-y-4">
            {AvisosImportantes.map((aviso) => (
              <li
                key={aviso.id}
                className={`border-l-4 ${
                  coresImportancia[aviso.importancia]
                } bg-white p-4 rounded-sm shadow-sm`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {aviso.titulo}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      aviso.importancia === "alta"
                        ? "bg-red-600 text-white"
                        : aviso.importancia === "media"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {aviso.importancia.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-2 whitespace-pre-line">
                  {aviso.descricao}
                </p>

                <p className="text-xs text-gray-500 mb-6">
                  🗓 De{" "}
                  <strong>
                    {format(new Date(aviso.data_inicio), "dd/MM/yyyy")}
                  </strong>{" "}
                  até{" "}
                  <strong>
                    {format(new Date(aviso.data_fim), "dd/MM/yyyy")}
                  </strong>
                </p>

                {!avisosConfirmados.includes(aviso.id) ? (
                  <div className="flex justify-start pt-4 border-t">
                    <button
                      onClick={() => {
                        onConfirm(aviso.id);
                        setAvisosConfirmados((prev) => [...prev, aviso.id]);
                      }}
                      className="bg-green-600 text-white px-5 py-2 text-sm font-medium hover:bg-green-700 rounded-sm"
                    >
                      Confirmar leitura
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-green-600 pt-4 border-t">
                    ✅ Leitura confirmada
                  </p>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={onClose}
              // disabled={!todosConfirmados}
              className={`px-5 py-2 text-sm font-medium rounded-sm ${
                todosConfirmados
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    )
  );
}
