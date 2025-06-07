import React, { useState } from "react";
import { PlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import router from "next/router";

interface SidebarListaProps<T> {
  titulo: string;
  filtro: string;
  setFiltro: (value: string) => void;
  itens: T[];
  itemSelecionado: T | null | string;
  setItemSelecionado: (item: T) => void;
  onNovo?: () => void;
  renderItem: (item: T) => React.ReactNode;
  onItemClickExtras?: () => void;
}

export default function SidebarLista<T>({
  titulo,
  filtro,
  setFiltro,
  itens,
  itemSelecionado,
  setItemSelecionado,
  onNovo,
  renderItem,
  onItemClickExtras,
}: SidebarListaProps<T>) {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <>
      {/* Botão de abrir sidebar (mobile only) */}
      <button
        onClick={() => setSidebarAberta(true)}
        className="lg:hidden p-2 text-indigo-600"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Sidebar (offcanvas no mobile, fixa no desktop) */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 bg-white w-80 h-full transform transition-transform duration-300 ease-in-out border-r border-gray-200 flex flex-col
        ${
          sidebarAberta ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Cabeçalho */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-md font-semibold text-gray-700">{titulo}</h3>
          <div className="flex gap-2 items-center">
            {onNovo && (
              <button
                onClick={onNovo}
                className="text-indigo-600 hover:text-indigo-800 text-md font-medium flex items-center gap-1"
              >
                <PlusIcon className="w-5 h-5" />
                Novo
              </button>
            )}
            {/* Botão de fechar (mobile only) */}
            <button
              className="lg:hidden text-gray-500"
              onClick={() => setSidebarAberta(false)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Campo de busca */}
        <div className="px-4 py-3 border-b">
          <input
            type="text"
            placeholder="Busque por alguma palavra-chave..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full p-3 text-sm bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Lista com scroll */}
        <ul
          role="list"
          className="flex-1 overflow-y-auto divide-y divide-gray-200 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
        >
          {itens?.length > 0 &&
            itens.map((item: T | any, index: number) => {
              const chaveUnica =
                (item as any)?.id || (item as any)?.dia_da_semana || index;

              const estaSelecionado =
                titulo === "Seções"
                  ? itemSelecionado === (item as any)?.Title
                  : titulo === "Horários de Funcionamento"
                  ? (itemSelecionado as any)?.dia_da_semana ===
                    (item as any)?.dia_da_semana
                  : (itemSelecionado as any)?.id === (item as any)?.id;

              return (
                <li
                  key={chaveUnica}
                  className={`p-3 sm:px-6 lg:px-8 cursor-pointer ${
                    estaSelecionado
                      ? "bg-gray-200 text-indigo-600 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if ("link" in item && item.link) {
                      router.push(item.link);
                    } else {
                      setItemSelecionado(item);
                      onItemClickExtras?.();
                      setSidebarAberta(false); // fecha no mobile
                    }
                  }}
                >
                  {renderItem(item)}
                </li>
              );
            })}

          {!itens?.length && (
            <li key="vazio" className="p-3 text-gray-500 text-sm">
              Nenhum dado cadastrado
            </li>
          )}
        </ul>
      </aside>
    </>
  );
}
