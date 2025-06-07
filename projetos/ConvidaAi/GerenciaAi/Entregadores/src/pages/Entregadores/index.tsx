"use client";

import { useContext, useEffect, useState } from "react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AcessoNegado from "@/src/components/AcessoNegado";
import { AuthContext } from "@/src/contexts/AuthContext";
import { Usuario } from "@/src/types/Usuarios";
import {
  createItems,
  getAllItens,
  updateItem,
  deleteItem,
} from "../../lib/entregadores";
import imgNotFound from "../../../assets/SemFoto.png";
import toast from "react-hot-toast";
import { Deletar } from "./Deletar";
import Detalhes from "./Detalhes";
import EditarItem from "./Editar";
import CriarItem from "./Criar";
import SidebarLista from "@/src/components/SidebarLista";
import Image from "next/image";

export default function Entregadores() {
  let { user } = useContext(AuthContext);

  const [criarNovoItem, setcriarNovoItem] = useState(false);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [ItemEmEdicao, setItemEmEdicao] = useState<Usuario[] | any>(null);

  const [Entregadores, setEntregadores] = useState<Usuario[]>([]);
  const [Entregadoreselecionado, setEntregadoreselecionado] = useState<
    Usuario | null | any
  >(null);

  const [filtro, setFiltro] = useState("");
  const [filtroLog, setFiltroLog] = useState<string>("todos");

  const [updateCreate, setupdateCreate] = useState<number>(0);

  const handleNovoItem = () => {
    setcriarNovoItem(true);
    setEntregadoreselecionado(null);
  };

  const handleDeletarItem = async () => {
    try {
      const response = await deleteItem(
        user?.id || 0,
        user?.empreendimentoId || 0,
        Entregadoreselecionado?.id || 0
      );

      if (response?.status === 200) {
        toast.success(response.mensagem || "Usuário deletado com sucesso!");

        setupdateCreate(Math.random());
      } else {
        toast.error(response?.mensagem || "Erro ao deletar o usuário.");
      }
    } catch (error: any) {
      toast.error(error?.response.data.mensagem);
    }
  };
  const handleSalvarEdicao = async (dadosEditados: any) => {
    try {
      const userid = user?.id || 0;
      toast.success("Carregando...");

      const sanitize = (value: any) =>
        value === null || value === "null" || typeof value === "undefined"
          ? ""
          : value;

      const dataToSend: any = {
        ...dadosEditados,
        cpf: dadosEditados.cpf
          ? dadosEditados.cpf.replaceAll(".", "").replaceAll("-", "")
          : "",
        telefone: dadosEditados.telefone
          ? dadosEditados.telefone
              .replaceAll(" ", "")
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll("-", "")
          : "",
        logradouro: sanitize(dadosEditados.logradouro),
        complemento: sanitize(dadosEditados.complemento),
        cep: sanitize(dadosEditados.cep),
        numero: sanitize(dadosEditados.numero),
        cidade: sanitize(dadosEditados.cidade),
        estado: sanitize(dadosEditados.estado),
        pais: sanitize(dadosEditados.pais),
        bairro: sanitize(dadosEditados.bairro),
        status: sanitize(dadosEditados.status),
        tipo_veiculo: dadosEditados.tipo_veiculo
          ? sanitize(dadosEditados.tipo_veiculo)
          : "MOTO",
      };

      delete dataToSend.id;
      delete dataToSend.imagem_perfil;
      delete dataToSend.criado_em;
      delete dataToSend.criado_por;
      delete dataToSend.atualizado_em;
      delete dataToSend.atualizado_por;
      delete dataToSend.logs;
      delete dataToSend.empreendimento;
      delete dataToSend.empreendimentoId;

      const response = await updateItem(
        dataToSend,
        userid,
        user?.empreendimentoId || 0,
        dadosEditados?.id || 0
      );

      if (response.status === 200) {
        toast.success(response.mensagem);

        setItemEmEdicao(null);
        setEntregadoreselecionado(Entregadores?.[0]);
        setupdateCreate(Math.random());
      } else {
        toast.error(response.mensagem);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.mensagem || "Erro ao atualizar.");
      return error;
    }
  };
  const handleSalvar = async (Item: Usuario | any) => {
    try {
      const userid = user?.id || 0;
      toast.success("Carregando...");

      const sanitize = (value: any) =>
        value === null || value === "null" || typeof value === "undefined"
          ? ""
          : value;

      const dataToSend: any = {
        ...Item,
        cpf: Item.cpf ? Item.cpf.replaceAll(".", "").replaceAll("-", "") : "",
        telefone: Item.telefone
          ? Item.telefone
              .replaceAll(" ", "")
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll("-", "")
          : "",
        logradouro: sanitize(Item.logradouro),
        complemento: sanitize(Item.complemento),
        cep: sanitize(Item.cep),
        numero: sanitize(Item.numero),
        cidade: sanitize(Item.cidade),
        estado: sanitize(Item.estado),
        pais: sanitize(Item.pais),
        bairro: sanitize(Item.bairro),
        tipo_veiculo: Item.tipo_veiculo ? sanitize(Item.tipo_veiculo) : "MOTO",
      };

      const response = await createItems(
        dataToSend,
        userid,
        user?.empreendimentoId || 0
      );

      if (response.status === 201) {
        toast.success(response.mensagem);

        setItemEmEdicao(null);
        setupdateCreate(Math.random());
      } else {
        toast.error(response.mensagem);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.mensagem || "Erro ao atualizar.");
      return error;
    }
  };

  useEffect(() => {
    const innitUsers = async () => {
      try {
        if (user?.nome) {
          const idEmpreendimento = user.empreendimentoId
            ? user.empreendimentoId
            : 1;

          const response = await getAllItens(idEmpreendimento);
          if (response?.status === 200) {
            setEntregadores(response.entregadores || []);
            if (response.entregadores?.length > 0) {
              setEntregadoreselecionado(response.entregadores[0]);
            }
          } else {
            toast.error("Erro ao carregar usuários.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro inesperado ao carregar os usuários.");
      }
    };

    innitUsers();
  }, [user, updateCreate]);

  console.log(Entregadoreselecionado);

  return (
    <>
      {user?.perfil_usuario !== "FUNCIONARIO" ? (
        <div className="flex flex-col lg:flex-row p-2">
          <SidebarLista
            titulo="Entregadores"
            filtro={filtro}
            setFiltro={setFiltro}
            itens={Entregadores.filter(
              (item) =>
                item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                item.email.toLowerCase().includes(filtro.toLowerCase()) ||
                item.cpf.toLowerCase().includes(filtro.toLowerCase()) ||
                item?.perfil_usuario
                  ?.toLowerCase()
                  .includes(filtro.toLowerCase()) ||
                item.telefone.toLowerCase().includes(filtro.toLowerCase())
            )}
            itemSelecionado={Entregadoreselecionado}
            setItemSelecionado={(item) => {
              setEntregadoreselecionado(item);
              setItemEmEdicao(null);
              setConfirmandoExclusao(false);
              setcriarNovoItem(false);
            }}
            onNovo={handleNovoItem}
            renderItem={(item) => (
              <div className="flex items-center gap-x-3 text-md">
                <Image
                  src={
                    item.imagem_perfil ? item.imagem_perfil : imgNotFound.src
                  }
                  alt="Imagem de Perfil"
                  width={200}
                  height={200}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <h3 className="flex-auto truncate font-semibold">
                  {item.nome}
                </h3>
              </div>
            )}
          />

          <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 bg-white">
            {ItemEmEdicao ? (
              <EditarItem
                usuario={Entregadoreselecionado}
                onSalvar={handleSalvarEdicao}
                onCancelar={() => setItemEmEdicao(null)}
              />
            ) : confirmandoExclusao ? (
              <Deletar
                titulo={`Tem certeza que deseja excluir ${Entregadoreselecionado?.nome}`}
                descricao="Essa ação não poderá ser desfeita."
                onCancel={() => setConfirmandoExclusao(false)}
                onConfirm={() => {
                  handleDeletarItem();
                  setConfirmandoExclusao(false);
                }}
              />
            ) : criarNovoItem ? (
              <CriarItem
                onSalvar={handleSalvar}
                onCancelar={() => {
                  setcriarNovoItem(false);
                  setEntregadoreselecionado(Entregadores?.[0]);
                }}
              />
            ) : (
              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {Entregadoreselecionado?.nome}
                  </h3>
                  <p className="mt-1 max-w-2xl text-md text-gray-500">
                    Informações detalhadas do Usuário.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4">
                  {(Entregadoreselecionado?.perfil_usuario !== "MASTER" ||
                    user?.perfil_usuario === "MASTER") && (
                    <>
                      <button
                        onClick={() => setItemEmEdicao(Entregadoreselecionado)}
                        className="flex items-center gap-1 text-md text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                        Editar
                      </button>
                      <button
                        onClick={() => setConfirmandoExclusao(true)}
                        className="flex items-center gap-1 text-md text-red-600 hover:text-red-700 font-medium"
                      >
                        <TrashIcon className="w-5 h-5" />
                        Excluir
                      </button>
                    </>
                  )}
                </div>

                {Entregadoreselecionado && (
                  <Detalhes entregador={Entregadoreselecionado} />
                )}
              </div>
            )}
          </main>
        </div>
      ) : (
        <AcessoNegado />
      )}
    </>
  );
}
