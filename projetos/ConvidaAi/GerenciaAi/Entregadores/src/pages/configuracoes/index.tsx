"use client";

import { useState } from "react";

import {
  MapPinIcon,
  WifiIcon,
  LockClosedIcon,
  MapIcon,
  UserCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import InformacoesGerais from "@/src/components/ConfigEmpreendimento/InformacoesGerais";
import EnderecoPessoal from "@/src/components/ConfigEmpreendimento/Endereco";
import RedesSociais from "@/src/components/ConfigEmpreendimento/RedesSociais";
import ServiceAreaSelector from "@/src/components/ConfigEmpreendimento/ServiceAreaSelector";
import CepsDisponiveis from "@/src/components/ConfigEmpreendimento/CepsDisponiveis";
import SidebarLista from "@/src/components/SidebarLista";

export default function Profile() {
  const [selectedSection, setSelectedSection] =
    useState<string>("Informações Gerais");

  const [filtro, setFiltro] = useState("");

  const activityItems = [
    {
      Title: "Informações Gerais",
      Icon: <UserCircleIcon className="h-5 w-5 text-gray-600" />,
      componente: <InformacoesGerais />,
    },
    {
      Title: "Endereço",
      Icon: <MapPinIcon className="h-5 w-5 text-gray-600" />,
      componente: <EnderecoPessoal />,
    },
    {
      Title: "Redes sociais e Contato",
      Icon: <WifiIcon className="h-5 w-5 text-gray-600" />,
      componente: <RedesSociais />,
    },

    {
      Title: "Raio de Atendimento",
      Icon: <MapIcon className="h-5 w-5 text-gray-600" />,
      componente: <ServiceAreaSelector />,
    },
    {
      Title: "CEPs disponíveis",
      Icon: <EnvelopeIcon className="h-5 w-5 text-gray-600" />,
      componente: <CepsDisponiveis />,
      link: "/CepsDisponiveis",
    },
    {
      Title: "Horários De Funcionamento",
      Icon: <EnvelopeIcon className="h-5 w-5 text-gray-600" />,
      componente: <CepsDisponiveis />,
      link: "/Horarios",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <SidebarLista
        titulo="Seções"
        filtro={filtro}
        setFiltro={setFiltro}
        itens={activityItems.filter((item) =>
          item.Title.toLowerCase().includes(filtro.toLowerCase())
        )}
        itemSelecionado={selectedSection}
        setItemSelecionado={(item) => setSelectedSection(item.Title)}
        onNovo={undefined}
        renderItem={(item) => (
          <div
            className={`flex items-center gap-x-3 p-2 ${
              selectedSection === item.Title ? "text-md" : "text-sm"
            }`}
          >
            {item.Icon}
            <h3 className="flex-auto truncate font-semibold">{item.Title}</h3>
          </div>
        )}
      />

      <main className="flex-1 h-full">
        {
          activityItems.find((item) => item.Title === selectedSection)
            ?.componente
        }
      </main>
    </div>
  );
}
