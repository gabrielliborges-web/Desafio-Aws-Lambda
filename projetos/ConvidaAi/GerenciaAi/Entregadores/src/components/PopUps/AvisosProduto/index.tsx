import React from "react";

type AvisosProdutoProps = {
  userName: string;
  onClose: () => void;
  onChangeAviso: () => void;
};

const AvisosProduto: React.FC<AvisosProdutoProps> = ({
  userName,
  onClose,
  onChangeAviso,
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-orange-100 border-l-4 border-orange-500 p-4 rounded-md shadow-md max-w-sm">
      <div className="flex items-center gap-3">
        <div className="flex-auto">
          <h2 className="text-md font-semibold text-orange-700">
            Olá, {userName}!
          </h2>
          <p className="text-sm text-gray-700 mt-1">
            Existem produtos que precisam de atenção.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-2">
        <button
          onClick={onClose}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Fechar
        </button>
        <button
          onClick={onChangeAviso}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition"
        >
          Verificar
        </button>
      </div>
    </div>
  );
};

export default AvisosProduto;
