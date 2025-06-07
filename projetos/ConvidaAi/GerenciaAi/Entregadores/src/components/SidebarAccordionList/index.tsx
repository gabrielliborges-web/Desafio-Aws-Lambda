import { useState } from "react";
import {
  PlusIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface SidebarAccordionListProps<T> {
  titulo: string;
  filtro: string;
  setFiltro: (value: string) => void;
  dadosAgrupados: { [grupo: string]: T[] };
  itemSelecionado: T | null;
  setItemSelecionado: (item: T) => void;
  onNovo?: () => void;
  onItemClickExtras?: () => void;
  renderItem: (item: T) => React.ReactNode;
  getItemKey?: (item: T) => string | number;
  isItemAtivo?: (itemSelecionado: T | null, item: T) => boolean;
}

export default function SidebarAccordionList<T>({
  titulo,
  filtro,
  setFiltro,
  dadosAgrupados,
  itemSelecionado,
  setItemSelecionado,
  onNovo,
  onItemClickExtras,
  renderItem,
  getItemKey = (item: any) => item.id,
  isItemAtivo = (selecionado, item) =>
    (selecionado as any)?.id === (item as any)?.id,
}: SidebarAccordionListProps<T>) {
  const [expandidos, setExpandidos] = useState<{ [key: string]: boolean }>({});

  const toggleGrupo = (grupo: string) => {
    setExpandidos((prev) => ({
      ...prev,
      [grupo]: !prev[grupo],
    }));
  };

  return (
    <aside className="bg-gray-50 w-full lg:w-96 border-b lg:border-b-0 lg:border-l border-gray-200  top-0 z-10 overflow-y-auto rounded-none lg:rounded-lg">
      <div className="flex flex-col gap-2 p-4 border-b border-gray-200 bg-white  top-0 z-20">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold text-gray-700">{titulo}</h3>
          {onNovo && (
            <button
              onClick={onNovo}
              className="text-indigo-600 hover:text-indigo-800 text-md font-medium flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Novo
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full mt-3 p-3 text-sm bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <ul
        role="list"
        className="flex flex-col divide-y divide-gray-200 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
      >
        {Object.entries(dadosAgrupados).map(([grupo, itens]) => {
          const itensFiltrados = itens.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(filtro.toLowerCase())
          );

          if (itensFiltrados.length === 0) return null;

          return (
            <li key={grupo} className="p-3">
              <button
                onClick={() => toggleGrupo(grupo)}
                className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700 hover:text-indigo-600"
              >
                <span className="capitalize">{grupo}</span>
                {expandidos[grupo] ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5" />
                )}
              </button>

              {expandidos[grupo] && (
                <ul className="mb-2">
                  {itensFiltrados.map((item) => {
                    const key = getItemKey(item);
                    const ativo = isItemAtivo(itemSelecionado, item);

                    return (
                      <li
                        key={key}
                        className={`p-5 sm:px-6 lg:px-8 cursor-pointer ${
                          ativo
                            ? "bg-gray-200 text-indigo-600 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemSelecionado(item);
                          onItemClickExtras?.();
                        }}
                      >
                        {renderItem(item)}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
