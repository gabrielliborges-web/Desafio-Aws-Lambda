import React from "react";

type DeletarProps = {
  titulo: string;
  descricao: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const Deletar: React.FC<DeletarProps> = ({
  titulo,
  descricao,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm max-w-xl mx-auto text-center space-y-4">
      <h2 className="text-lg font-bold text-gray-800">{titulo}</h2>
      <p className="text-gray-600 text-md">{descricao}</p>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onConfirm();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
        >
          Confirmar Exclusão
        </button>
      </div>
    </div>
  );
};
export default Deletar;
