"use client";

import { Dispatch, SetStateAction } from "react";

interface Secao {
  Title: string;
  Icon: JSX.Element;
  componente: JSX.Element;
}

interface SidebarSecoesProps {
  titulo: string;
  secoes: Secao[];
  secaoSelecionada: Secao;
  setSecaoSelecionada: Dispatch<SetStateAction<Secao>>;
}

export default function SidebarSecoes({
  titulo,
  secoes,
  secaoSelecionada,
  setSecaoSelecionada,
}: SidebarSecoesProps) {
  return (
    <aside className="hidden lg:block bg-white lg:w-96 lg:border-l lg:border-gray-200 sticky top-0 z-10 min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h3 className="text-md font-semibold text-gray-700">{titulo}</h3>
      </div>

      <ul
        role="list"
        className="flex flex-col divide-y divide-gray-200 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1"
      >
        {secoes.map((secao) => (
          <li
            key={secao.Title}
            onClick={() => setSecaoSelecionada(secao)}
            className={`px-4 py-5 sm:px-6 lg:px-8 cursor-pointer ${
              secaoSelecionada.Title === secao.Title
                ? "bg-gray-200 text-indigo-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <div
              className={`flex items-center gap-x-3 ${
                secaoSelecionada.Title === secao.Title
                  ? "text-md text-indigo-600"
                  : "text-sm text-black"
              }`}
            >
              {secao.Icon}
              <h3 className="flex-auto truncate font-semibold">
                {secao.Title}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
