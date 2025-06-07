import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import InputMask from "react-input-mask";
import { AuthContext } from "@/src/contexts/AuthContext";
import { Search } from "lucide-react";
import Image from "next/image";
import imgNotFound from "../../../../assets/SemFoto.png";

type TipoVeiculo =
  | "MOTO"
  | "BICICLETA"
  | "CARRO"
  | "SCOOTER"
  | "PATINETE"
  | "CAMINHONETE"
  | "VAN"
  | "CAMINHAO"
  | "ONIBUS"
  | "PEDESTRE"
  | "TRICICLO"
  | "QUADRICICLO"
  | "JETSKI"
  | "LANCHA"
  | "BARCO"
  | "HELICOPTERO"
  | "DRONE";

type Status = "ATIVO" | "INATIVO";

export type Entregador = {
  nome: string;
  email: string;
  senha: string;
  imagem_perfil: string;
  cpf: string;
  telefone: string;
  tipo_veiculo: TipoVeiculo;
  placa: string;
  modelo_veiculo: string;
  cor_veiculo: string;
  ativo: Status;
  logradouro: string;
  complemento?: string;
  cep: string;
  numero: string;
  cidade: string;
  estado: string;
  pais: string;
  bairro: string;
};

type CriarEntregadorProps = {
  entregador?: Entregador;
  onSalvar: (entregador: Entregador) => void;
  onCancelar: () => void;
};

export default function CriarEntregador({
  entregador,
  onSalvar,
  onCancelar,
}: CriarEntregadorProps) {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState<Entregador>({
    nome: "",
    email: "",
    senha: "",
    imagem_perfil: "",
    cpf: "",
    telefone: "",
    tipo_veiculo: "MOTO",
    placa: "",
    modelo_veiculo: "",
    cor_veiculo: "",
    ativo: "ATIVO",
    logradouro: "",
    complemento: "",
    cep: "",
    numero: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
    bairro: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buscarCep = async () => {
    const cepLimpo = formData.cep.replace(/[^0-9]/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
          pais: "Brasil",
        }));
      } else {
        alert("CEP não encontrado.");
      }
    } catch (err) {
      alert("Erro ao buscar o CEP.");
    }
  };

  console.log(formData);
  return (
    <div className="bg-white w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <Image
            src={
              formData.imagem_perfil
                ? typeof formData.imagem_perfil === "string"
                  ? formData.imagem_perfil
                  : URL.createObjectURL(formData.imagem_perfil)
                : imgNotFound.src
            }
            alt="Imagem de Perfil"
            width={150}
            height={150}
            className="w-full h-full rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="imagem_perfil"
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-6.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.732z"
              />
            </svg>
          </label>

          <input
            type="file"
            id="imagem_perfil"
            name="imagem_perfil"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData((prev: any) => ({ ...prev, imagem_perfil: file }));
            }}
            className="hidden"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="w-full border border-gray-300  p-3 text-gray-700"
            placeholder="Digite o nome completo"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          label="Senha"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleInputChange}
        />
        <InputMaskField
          label="Telefone"
          name="telefone"
          mask="(99) 99999-9999"
          value={formData.telefone}
          onChange={handleInputChange}
        />
        <InputMaskField
          label="CPF"
          name="cpf"
          mask="999.999.999-99"
          value={formData.cpf}
          onChange={handleInputChange}
        />
        <SelectField
          label="Status"
          name="ativo"
          value={formData.ativo}
          onChange={handleInputChange}
          options={[
            { label: "ATIVO", value: "ATIVO" },
            { label: "INATIVO", value: "INATIVO" },
          ]}
        />
      </div>

      {/* Veículo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Tipo de Veículo"
          name="tipo_veiculo"
          value={formData.tipo_veiculo}
          onChange={handleInputChange}
          options={tipoVeiculos}
        />
        <Input
          label="Placa"
          name="placa"
          value={formData.placa}
          onChange={handleInputChange}
        />
        <Input
          label="Modelo do Veículo"
          name="modelo_veiculo"
          value={formData.modelo_veiculo}
          onChange={handleInputChange}
        />
        <Input
          label="Cor do Veículo"
          name="cor_veiculo"
          value={formData.cor_veiculo}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col sm:flex-row gap-2 w-full">
          <div className="flex-1">
            <InputMaskField
              label="CEP"
              name="cep"
              mask="99999-999"
              value={formData.cep}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={buscarCep}
              type="button"
              className="h-11 px-4 bg-blue-600 text-white font-semibold rounded-sm hover:bg-blue-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Buscar
              </div>
            </button>
          </div>
        </div>

        <Input
          label="Logradouro"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleInputChange}
        />
        <Input
          label="Número"
          name="numero"
          value={formData.numero}
          onChange={handleInputChange}
        />
        <Input
          label="Bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleInputChange}
        />
        <Input
          label="Cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleInputChange}
        />
        <Input
          label="Estado"
          name="estado"
          value={formData.estado}
          onChange={handleInputChange}
        />
        <Input
          label="País"
          name="pais"
          value={formData.pais}
          onChange={handleInputChange}
        />
        <Input
          label="Complemento"
          name="complemento"
          value={formData.complemento || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            const dataTratada = {
              ...formData,
              placa: formData.placa || "",
              modelo_veiculo: formData.modelo_veiculo || "",
              cor_veiculo: formData.cor_veiculo || "",
            };
            onSalvar(dataTratada);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
      >
        <option value="">Selecione</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function InputMaskField({ label, name, mask, value, onChange }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <InputMask mask={mask} value={value} onChange={onChange}>
        {(inputProps: any) => (
          <input
            {...inputProps}
            name={name}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
          />
        )}
      </InputMask>
    </div>
  );
}

const tipoVeiculos = [
  { label: "MOTO", value: "MOTO" },
  { label: "BICICLETA", value: "BICICLETA" },
  { label: "CARRO", value: "CARRO" },
  { label: "SCOOTER", value: "SCOOTER" },
  { label: "PATINETE", value: "PATINETE" },
  { label: "CAMINHONETE", value: "CAMINHONETE" },
  { label: "VAN", value: "VAN" },
  { label: "CAMINHAO", value: "CAMINHAO" },
  { label: "ONIBUS", value: "ONIBUS" },
  { label: "PEDESTRE", value: "PEDESTRE" },
  { label: "TRICICLO", value: "TRICICLO" },
  { label: "QUADRICICLO", value: "QUADRICICLO" },
  { label: "JETSKI", value: "JETSKI" },
  { label: "LANCHA", value: "LANCHA" },
  { label: "BARCO", value: "BARCO" },
  { label: "HELICOPTERO", value: "HELICOPTERO" },
  { label: "DRONE", value: "DRONE" },
];
