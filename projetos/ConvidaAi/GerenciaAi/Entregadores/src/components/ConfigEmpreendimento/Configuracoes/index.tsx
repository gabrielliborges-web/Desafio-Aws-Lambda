"use client";

import { AuthContext } from "@/src/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const CoresPrimarias = [
  "BLUE",
  "RED",
  "YELLOW",
  "BLACK",
  "WHITE",
  "NAVY",
  "INDIGO",
  "CYAN",
  "ROYAL_BLUE",
  "GOLD",
  "TEAL",
  "MAGENTA",
  "CRIMSON",
  "TAN",
  "SAPPHIRE",
  "RUBY",
  "AMETHYST",
  "EMERALD",
  "BRONZE",
  "COPPER",
  "PLATINUM",
  "CHARCOAL",
  "SLATE",
  "MUSTARD",
  "APRICOT",
  "CREAM",
  "LAVENDER",
  "OCHRE",
  "DENIM",
];
const CoresSecundarias = [
  "GREEN",
  "ORANGE",
  "PURPLE",
  "GRAY",
  "BROWN",
  "PINK",
  "LIME",
  "TURQUOISE",
  "BEIGE",
  "SILVER",
  "OLIVE",
  "SALMON",
  "CORAL",
  "MAROON",
  "IVORY",
  "PEACH",
  "AQUA",
  "MINT",
  "WHEAT",
  "FUCHSIA",
  "PERIWINKLE",
  "CINNAMON",
  "SEAFOAM",
  "MAUVE",
  "BLUSH",
  "SAND",
  "BRICK",
  "SKY_BLUE",
  "ALMOND",
  "MOSS",
];
const Notificacoes = ["EMAIL", "SMS", "PUSH", "NENHUM"];

interface ConfiguracoesForm {
  dois_fatores: boolean;
  ultimo_login: string;
  notificacoes: string[];
  cor_primaria: string;
  cor_secundaria: string;
}

export default function Configuracoes() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState<ConfiguracoesForm>({
    dois_fatores: false,
    ultimo_login: new Date().toLocaleString(),
    notificacoes: ["NENHUM"],
    cor_primaria: "BLUE",
    cor_secundaria: "ORANGE",
  });

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      dois_fatores: !prev.dois_fatores,
    }));
  };

  const handleSelectChange = (
    field: keyof ConfiguracoesForm,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      notificacoes: prev.notificacoes.includes(value)
        ? prev.notificacoes.filter((item) => item !== value)
        : [...prev.notificacoes, value],
    }));
  };

  useEffect(() => {
    if (user) {
      // setFormData({
      //   dois_fatores: user.dois_fatores || false,
      //   ultimo_login: user.ultimo_login || new Date().toLocaleString(),
      //   notificacoes: user.notificacoes || ["NENHUM"],
      //   cor_primaria: user.cor_primaria || "BLUE",
      //   cor_secundaria: user.cor_secundaria || "ORANGE",
      // });
    }
  }, [user]);

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Configurações</h2>
      <form className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={formData.dois_fatores}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Autenticação em Dois Fatores
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Último Login
          </label>
          <input
            type="text"
            value={formData.ultimo_login}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notificações
          </label>
          <div className="flex flex-wrap gap-3">
            {Notificacoes.map((notificacao) => (
              <label
                key={notificacao}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={formData.notificacoes.includes(notificacao)}
                  onChange={() => handleMultiSelectChange(notificacao)}
                  className="mr-2"
                />
                {notificacao}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor Primária
          </label>
          <select
            value={formData.cor_primaria}
            onChange={(e) => handleSelectChange("cor_primaria", e.target.value)}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 bg-white"
          >
            {CoresPrimarias.map((cor) => (
              <option key={cor} value={cor}>
                {cor}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor Secundária
          </label>
          <select
            value={formData.cor_secundaria}
            onChange={(e) =>
              handleSelectChange("cor_secundaria", e.target.value)
            }
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 bg-white"
          >
            {CoresSecundarias.map((cor) => (
              <option key={cor} value={cor}>
                {cor}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}
