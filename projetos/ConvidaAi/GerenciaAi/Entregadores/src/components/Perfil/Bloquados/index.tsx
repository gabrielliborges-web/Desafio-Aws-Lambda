import Image from "next/image";
import React from "react";

export type BlockedUser = {
  name: string;
  dataBloqueio: string;
  email: string;
  phone: string;
  imageUrl?: string;
};

type BlockedListProps = {
  blockedUsers: BlockedUser[];
  onUnblock: (email: string) => void;
};

const BlockedList: React.FC<BlockedListProps> = ({
  blockedUsers,
  onUnblock,
}) => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 overflow-y-auto h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400  bg-white rounded-sm shadow-sm"
    >
      {blockedUsers.map((item) => (
        <li
          key={item.name}
          className="px-4 py-4 sm:px-6 lg:px-8 border-b last:border-none hover:bg-gray-50 transition flex justify-between items-center "
        >
          {/* Informações do usuário à esquerda */}
          <div className="flex items-center gap-x-3 ">
            <Image
              alt=""
              src={item.imageUrl || "https://via.placeholder.com/50"}
              className="h-10 w-10 flex-none rounded-full bg-gray-200"
            />
            <div className="flex-auto">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="truncate text-sm text-gray-500">{item.email}</p>
              <p className="truncate text-sm text-gray-500">{item.phone}</p>
            </div>
          </div>

          {/* Data e botão à direita */}
          <div className="flex flex-col items-end">
            <time
              dateTime={item.dataBloqueio}
              className="text-xs text-gray-500 mb-2"
            >
              Bloqueado em: {item.dataBloqueio}
            </time>
            <button
              onClick={() => onUnblock(item.email)}
              className="rounded bg-blue-500 px-4 py-1.5 text-sm text-white hover:bg-blue-600 transition"
            >
              Desbloquear
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlockedList;
