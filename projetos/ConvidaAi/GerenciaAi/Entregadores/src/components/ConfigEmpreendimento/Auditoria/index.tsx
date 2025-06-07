"use client";

import React from "react";

interface AuditoriaForm {
  criado_porId: number | null;
  atualizado_porId: number | null;
  criado_por: string | null;
  atualizado_por: string | null;
  criado_em: string | null;
  atualizado_em: string | null;
}

export default function Auditoria() {
  const formData: AuditoriaForm = {
    criado_porId: 1,
    atualizado_porId: 2,
    criado_por: "Admin",
    atualizado_por: "Editor",
    criado_em: "2025-01-18T14:30:00",
    atualizado_em: "2025-01-18T15:45:00",
  };

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Informações de Auditoria
      </h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Criado Por
          </label>
          <input
            type="text"
            value={`${formData.criado_por || "N/A"} (ID: ${
              formData.criado_porId || "N/A"
            })`}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Atualizado Por
          </label>
          <input
            type="text"
            value={`${formData.atualizado_por || "N/A"} (ID: ${
              formData.atualizado_porId || "N/A"
            })`}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Criado Em
          </label>
          <input
            type="text"
            value={formData.criado_em || "N/A"}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Atualizado Em
          </label>
          <input
            type="text"
            value={formData.atualizado_em || "N/A"}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-500 bg-gray-100"
          />
        </div>
      </form>
    </div>
  );
}
