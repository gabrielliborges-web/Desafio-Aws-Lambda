"use client";

import { useState } from "react";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import {} from "@heroicons/react/20/solid";

import {
  MapPinIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import InformacoesPessoais from "@/src/components/Perfil/InformacoesGerais";
import EnderecoPessoal from "@/src/components/Perfil/Endereco";
import HistoricoAlteracoes from "@/src/components/Perfil/HistoricoAlteracoes";
import ResetPassword from "@/src/components/Perfil/ResetPassword";
import { Usuario } from "@/src/types/Usuarios";
import SidebarSecoes from "@/src/components/SidebarSecoes";

export default function Profile({ Profile }: { Profile: Usuario }) {
  const activityItems = [
    {
      Title: "Informações Pessoais",
      Icon: <UserCircleIcon className="h-5 w-5 text-gray-600" />,
      componente: <InformacoesPessoais />,
    },
    {
      Title: "Endereço",
      Icon: <MapPinIcon className="h-5 w-5 text-gray-600" />,
      componente: <EnderecoPessoal />,
    },
    {
      Title: "Configuração de Senha",
      Icon: <LockClosedIcon className="h-5 w-5 text-gray-600" />,
      componente: <ResetPassword />,
    },
    {
      Title: "Histórico de Alterações",
      Icon: <ClockIcon className="h-5 w-5 text-gray-600" />,
      componente: <HistoricoAlteracoes />,
    },
  ];
  const [selectedSection, setSelectedSection] = useState(activityItems[0]);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row p-2">
      <SidebarSecoes
        titulo="Conta"
        secoes={activityItems}
        secaoSelecionada={selectedSection}
        setSecaoSelecionada={setSelectedSection}
      />

      <div className="lg:hidden">
        <div className="flex space-x-4 border-b border-gray-200 bg-white overflow-x-auto">
          {activityItems.map((item) => (
            <button
              key={item.Title}
              onClick={() => setSelectedSection(item)}
              className={`flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-gray-600 ${
                selectedSection.Title === item.Title
                  ? "bg-gray-200 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.Icon}
              <span>{item.Title}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8  bg-gray-100">
        {selectedSection.componente}
      </main>
    </div>
  );
}
