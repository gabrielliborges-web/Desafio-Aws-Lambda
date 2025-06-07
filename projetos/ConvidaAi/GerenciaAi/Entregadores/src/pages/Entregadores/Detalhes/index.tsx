import { AuthContext } from "@/src/contexts/AuthContext";
import { useContext } from "react";

interface DetalhesEntregadorProps {
  entregador: any;
}

export default function DetalhesEntregador({
  entregador,
}: DetalhesEntregadorProps) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-100">
          {[
            { label: "Nome", value: entregador?.nome },
            { label: "E-mail", value: entregador?.email },
            { label: "CPF", value: entregador?.cpf },
            { label: "Telefone", value: entregador?.telefone },
            { label: "Tipo de Veículo", value: entregador?.tipo_veiculo },
            { label: "Modelo", value: entregador?.modelo_veiculo },
            { label: "Placa", value: entregador?.placa },
            { label: "Cor do Veículo", value: entregador?.cor_veiculo },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-md font-medium text-gray-900">
                {item.label}
              </dt>
              <dd className="mt-1 text-md text-gray-700 sm:col-span-2 sm:mt-0">
                {item.value || "Não informado"}
              </dd>
            </div>
          ))}

          <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-md font-medium text-gray-900">Status</dt>
            <dd className="mt-1 text-md text-gray-700 sm:col-span-2 sm:mt-0">
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  entregador?.ativo === "ATIVO"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {entregador?.ativo || "Indefinido"}
              </span>
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-md font-medium text-gray-900">Endereço</dt>
            <dd className="mt-1 text-md text-gray-700 sm:col-span-2 sm:mt-0">
              {entregador?.logradouro
                ? `${entregador.logradouro}, ${entregador.numero}, ${entregador.bairro} - ${entregador.cidade}/${entregador.estado}, ${entregador.pais}`
                : "Endereço não cadastrado"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
