"use client";

import Cookies from "js-cookie";
import { format } from "date-fns";
import { Avatar } from "./avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "./navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "./sidebar";
import { SidebarLayout } from "./sidebar-layout";
import {
  BellIcon,
  Cog6ToothIcon,
  TagIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CubeIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import {
  CalendarDaysIcon,
  TruckIcon,
  CreditCardIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  BuildingStorefrontIcon,
  WrenchScrewdriverIcon,
  IdentificationIcon,
  ClockIcon,
  MapPinIcon,
  GiftIcon,
  BellAlertIcon,
  ShoppingCartIcon,
  LifebuoyIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { AuthContext } from "../contexts/AuthContext";

import { SparklesIcon } from "@heroicons/react/20/solid";

import { usePathname } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ModalAviso, { ModalAvisoProps } from "./ModalAvisos";
import AvisosProduto from "./PopUps/AvisosProduto";

import imgNotFound from "../../assets/SemFoto.png";

import imgCatalist from "../../public/teams/catalyst.svg";
import { getAllNoticiasProdutos } from "../lib/AvisosProdutos";
import toast from "react-hot-toast";
import ModalAvisosImportantes from "./AvisosImportantes";
import {
  getAvisosImportantesUser,
  getAvisosImportantesUserConfimacao,
  confirmAvisoItem,
} from "../lib/AvisosImportantes";
import { socket } from "../services/socket";
import { BoxesIcon } from "lucide-react";
import SliderOver from "./SliderOver";
import { enviarMensagem, getAllConversas, marcarConversaComoLida } from "../lib/conversasPedido";

import Image from "next/image";
import jsPDF from "jspdf";
import { EmpreendimentoProps } from "../types/EmpreendimentoProps";

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  imagem_perfil?: string | null;
}

interface Pedido {
  id: number;
  codigo_pedido: string;
  valor_total: string;
  status: string;
  data_pedido: string;
  empreendimento: Cliente
}

interface Usuario {
  id: number;
  nome: string;
  imagem_perfil?: string | null;
}

interface Mensagem {
  id: number;
  mensagem: string;
  remetente: "CLIENTE" | "EMPREENDEDOR";
  enviado_em: string; // ISO string
  usuario?: Usuario | null;
  cliente?: Cliente | null;
}

interface Conversa {
  id: number;
  cliente: Cliente;
  empreendimento: EmpreendimentoProps;
  pedido: Pedido;
  mensagens: Mensagem[];
  empreendimento_id: number;
  leitura: boolean;
  leitura_cliente: boolean;
  leitura_empreendimento: boolean;
  leitura_entregador: boolean;
  ultimaMensagem: {
    cliente: { id: number, nome: string }
    enviado_em: string;
    id: number;
    remetente: "CLIENTE"
    mensagem: string
  }

}


function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  const { signOut, user } = useContext(AuthContext);

  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="Perfil">
        <UserCircleIcon />
        <DropdownLabel>Minha conta</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="Politica-privacidade">
        <ShieldCheckIcon />
        <DropdownLabel>Politicas de privacidade</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="Feedbacks">
        <LightBulbIcon />
        <DropdownLabel>Compartilhar feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel onClick={() => signOut()}>Sair</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {


  let pathname = usePathname();
  let { user } = useContext(AuthContext);

  const AVISO_COOKIE_KEY = "popup_aviso_visto";
  const [isPopUpAvisoOpen, setisPopUpAvisoOpen] = useState<boolean>(false);
  const [isModalAvisoOpen, setisModalAvisoOpen] = useState<boolean>(false);
  const [isOpenCaixaMensagens, setisOpenCaixaMensagens] = useState<boolean>(false);

  const [caixaDeMensagens, setcaixaDeMensagens] = useState<Conversa[]>([]);

  const closeSlider = () => setisOpenCaixaMensagens(false);

  const [produtos, setprodutos] = useState<ModalAvisoProps>({
    produtos: [],
    produtosEstoqueBaixo: [],
    produtosVencimento: [],
    onClose: () => { },
  });
  const [listaDeAvisos, setlistaDeAvisos] = useState<any[]>([]);
  const [listaDeAvisosConfirmados, setlistaDeAvisosConfirmados] = useState<
    any[]
  >([]);
  const [mostrarAvisos, setMostrarAvisos] = useState(false);
  const [mostrarAvisosConfirmados, setMostrarAvisosConfirmados] =
    useState(false);
  const [confirmado, setconfirmado] = useState<number>(0);

  const [conversaSelecionada, setConversaSelecionada] = useState<Conversa | null>(null);
  const [novaMensagem, setNovaMensagem] = useState('');

  async function handleEnviarMensagem() {
    if (novaMensagem.trim() === '') return;

    try {
      const novaMensagemEnviada = await enviarMensagem(
        {
          mensagem: novaMensagem,
          conversaId: conversaSelecionada?.id || 0,
          usuarioId: user?.id || 0,
        },
        user?.empreendimentoId || 0
      );
      setConversaSelecionada((prev) => ({
        ...prev!,
        mensagens: [...prev!.mensagens, novaMensagemEnviada],
      }));

      setNovaMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error("Erro ao enviar a mensagem, por favor, atualize a pagina e tente novamente.")
    }
  }
  const handleClose = (type: "Modal" | "PopUp") => {
    if (type === "Modal") {
      setisModalAvisoOpen(false);
      Cookies.set(AVISO_COOKIE_KEY, "true", { expires: 1 / 48 });
    } else {
      setisPopUpAvisoOpen(false);
      Cookies.set(AVISO_COOKIE_KEY, "true", { expires: 1 / 48 });
    }
  };
  const handleChangeAviso = () => {
    setisModalAvisoOpen(true);
  };
  const confirmarAviso = async (avisoId: number) => {
    try {
      const userId = user?.id;
      if (!userId) return toast.error("Usuário não autenticado.");

      toast.loading("Confirmando leitura...");

      const response = await confirmAvisoItem(userId, avisoId);
      toast.dismiss();

      if (response.status === 201 || response.status === 200) {
        toast.success("Leitura confirmada com sucesso.");
        setconfirmado(Math.random());
      } else {
        toast.error(response.mensagem || "Erro ao confirmar leitura.");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        error?.response?.data?.mensagem || "Erro ao confirmar leitura."
      );
    }
  };
  const handleMsgAvisos = async (
    msg: string,
    type: "new" | "edit" | "delete"
  ) => {
    if (!user) return;
    await getAvisosImportantesUser(user?.empreendimentoId, user?.id).then(
      (res) => {
        if (res.status === 200 && res.avisos.length > 0) {
          setlistaDeAvisos(res.avisos);
          setMostrarAvisos(type !== "delete");
          // toast.success(msg);
        }
      }
    );
  };
  const adicionarMensagemNova = async (data: any) => {
    let encontrou = false;

    setcaixaDeMensagens((prevMensagens) => {
      const atualizadas = prevMensagens.map((conversa) => {
        if (conversa.id === data.conversaId) {
          encontrou = true;
          return {
            ...conversa,
            mensagens: [...conversa.mensagens, data.mensagem],
            leitura: false,
            ultimaMensagem: {
              id: data.mensagem.id,
              mensagem: data.mensagem.mensagem,
              enviado_em: data.mensagem.enviado_em,
              remetente: data.mensagem.remetente,
              usuario: data.mensagem.usuario,
              cliente: data.mensagem.cliente,
            },
          };
        }
        return conversa;
      });

      if (encontrou) {
        const conversaAtualizada = atualizadas.find((c) => c.id === data.conversaId);
        const outrasConversas = atualizadas.filter((c) => c.id !== data.conversaId);

        if (conversaAtualizada) {
          return [conversaAtualizada, ...outrasConversas];
        }

        return atualizadas;
      }

      return atualizadas;
    });


    setConversaSelecionada((prev) => {
      if (prev && prev.id === data.conversaId) {
        encontrou = true;
        return {
          ...prev,
          mensagens: [...prev.mensagens, data.mensagem],
        };
      }
      return prev;
    });

    if (!encontrou) {
      const idEmpreendimento = user?.empreendimentoId ? user.empreendimentoId : 1;

      const [allConversas] = await Promise.all([
        getAllConversas(idEmpreendimento),
      ]);

      if (allConversas?.status === 200) {
        const allmensagens = allConversas.conversas || [];

        if (allmensagens.length > 0) {
          setcaixaDeMensagens(allmensagens);
        }
      } else {
        toast.error("Erro ao carregar mensagens.");
      }
    }
  };
  const handleDownloadPdf = () => {
    if (!conversaSelecionada) return;

    const doc = new jsPDF("p", "mm", "a4");
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxTextWidth = 180;
    let y = margin;

    const addHeader = () => {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(`Histórico de Mensagens`, pageWidth / 2, y, { align: "center" });

      y += 12;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Cliente: ${conversaSelecionada.cliente?.nome || "Não informado"}`, margin, y);
      y += 7;
      doc.text(`Pedido: ${conversaSelecionada.pedido?.codigo_pedido || "N/A"}`, margin, y);

      y += 10;
    };

    addHeader();

    // Mensagens
    conversaSelecionada.mensagens.forEach((msg) => {
      if (y > 270) {
        doc.addPage();
        y = margin;
        addHeader();
      }

      const isCliente = msg.remetente === "CLIENTE";

      const nomeCliente = conversaSelecionada.cliente?.nome || "Cliente";
      const nomeUsuario = msg.usuario?.nome || "Admin";
      const nomeEmpreendimento = user?.empreendimento?.nome || "";

      // Agora aqui o nome da pessoa formatado:
      const remetenteLinha = isCliente
        ? `Cliente: ${nomeCliente}`
        : `${nomeEmpreendimento}: ${nomeUsuario}`;

      const mensagem = msg.mensagem;
      const hora = format(new Date(msg.enviado_em), "dd/MM/yyyy HH:mm");

      const linesRemetente = doc.splitTextToSize(remetenteLinha, maxTextWidth);
      const linesMensagem = doc.splitTextToSize(mensagem, maxTextWidth);

      // Nome
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 37, 41);
      doc.text(linesRemetente, margin, y);

      y += linesRemetente.length * 6;

      // Mensagem
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50);
      doc.text(linesMensagem, margin, y);

      y += linesMensagem.length * 6;

      // Data/Hora
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(hora, margin, y);

      y += 3;

      // Linha separadora
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);

      y += 8; // Espaço depois da linha
    });

    doc.save(`conversa_${conversaSelecionada.pedido?.codigo_pedido || "conversa"}.pdf`);
  };
  async function handleAbrirConversaAdmin(conversa: any) {
    setConversaSelecionada(conversa);

    if (conversa.leitura) {
      return;
    }

    try {
      await marcarConversaComoLida(conversa.id, "EMPREENDIMENTO");

      setcaixaDeMensagens((prevMensagens) =>
        prevMensagens.map((c) => {
          if (c.id === conversa.id) {
            return {
              ...c,
              leitura: true,
            };
          }
          return c;
        })
      );
    } catch (error) {
      console.error("Erro ao marcar conversa como lida:", error);
    }
  }


  useEffect(() => {
    const onInnit = async () => {
      try {
        if (user?.nome) {
          const idEmpreendimento = user.empreendimentoId
            ? user.empreendimentoId
            : 1;

          const [allAvisosVencQnt, allConversas] = await Promise.all([
            getAllNoticiasProdutos(idEmpreendimento),
            getAllConversas(idEmpreendimento),
          ]);


          if (allConversas?.status === 200) {
            const allmensagens = allConversas.conversas || [];

            if (allmensagens.length > 0) {
              setcaixaDeMensagens(allmensagens)
            }
          } else {
            toast.error("Erro ao carregar mensagens.");
          }

          if (allAvisosVencQnt?.status === 200) {
            const produtos_alerta = allAvisosVencQnt.produtos_alerta || [];

            const cookieJaExibido = Cookies.get(AVISO_COOKIE_KEY) === "true";

            let hasNotice =
              produtos_alerta.vencimento.length > 0 ||
              produtos_alerta.estoque_baixo.length > 0;

            let allItensNotice = produtos_alerta.vencimento.concat(
              produtos_alerta.estoque_baixo
            );

            if (hasNotice) {
              setprodutos({
                produtos: allItensNotice,
                produtosEstoqueBaixo: produtos_alerta.estoque_baixo,
                produtosVencimento: produtos_alerta.vencimento,
                onClose: () => handleClose("Modal"),
              });

              if (!cookieJaExibido) {
                setisModalAvisoOpen(true);
                setisPopUpAvisoOpen(true);
              }
            } else {
              setisModalAvisoOpen(false);
              setisPopUpAvisoOpen(false);
            }
          } else {
            toast.error("Erro ao carregar avisos.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
        toast.error("Erro inesperado ao carregar os itens.");
      }
    };

    onInnit();
  }, [user]);

  useEffect(() => {
    const onInnit = async () => {
      try {
        if (user?.nome) {
          const idEmpreendimento = user.empreendimentoId
            ? user.empreendimentoId
            : 1;

          const [avisosUser, avisosConfirmados] = await Promise.all([
            getAvisosImportantesUser(idEmpreendimento, user.id),
            getAvisosImportantesUserConfimacao(idEmpreendimento, user.id),
          ]);

          if (avisosConfirmados.status === 200) {
            const Avisos = avisosConfirmados.avisos;
            setlistaDeAvisosConfirmados(Avisos);
          }

          if (avisosUser?.status === 200) {
            const Avisos = avisosUser.avisos;

            if (Avisos.length > 0) {
              setlistaDeAvisos(Avisos);
              setMostrarAvisos(true);
            }
          } else {
            toast.error("Erro ao carregar avisos.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
        toast.error("Erro inesperado ao carregar os itens.");
      }
    };

    onInnit();

    socket.on("novo-aviso", () => {
      if (user) {
        handleMsgAvisos("📢 Novo aviso importante disponível!", "new");
      }
    });

    socket.on("atualizado-aviso", () => {
      if (user) {
        handleMsgAvisos("📢 Aviso importante atualizado!", "edit");
      }
    });

    socket.on("deletar-aviso", () => {
      if (user) {
        handleMsgAvisos("📢 Aviso importante Deletado!", "delete");
      }
    });

    socket.on("nova-mensagem", (data) => {
      if (user) {
        adicionarMensagemNova(data);
        toast.success('Uma nova mensagem recebida.')
        const audio = new Audio('/message.mp3');
        audio.play();
      }
    });

    socket.on("novo-pedido", (data) => {
      if (user) {

        toast.success('Novo pedido recebido.')
        const audio = new Audio('/audio1.mp3');
        audio.play();

      }
    });

    return () => {
      socket.off("novo-aviso");
      socket.off("atualizado-aviso");
      socket.off("deletar-aviso");
      socket.off("nova-mensagem");
      socket.off("novo-pedido");
    };
  }, [user, confirmado]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (conversaSelecionada) {
      scrollToBottom();
    }
  }, [conversaSelecionada?.mensagens.length]);

  console.log(caixaDeMensagens)

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar
                  src={user?.imagem_perfil ? user.imagem_perfil : null}
                  square
                />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src={imgCatalist} />
                <SidebarLabel title="">Adega Diamante</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/configuracoes">
                  <Cog6ToothIcon />
                  <DropdownLabel>Configurações</DropdownLabel>
                </DropdownItem>

                <DropdownDivider />

                <DropdownItem href="/Perfil">
                  <UserCircleIcon />
                  <DropdownLabel>Meu Perfil</DropdownLabel>
                </DropdownItem>

                <DropdownItem onClick={() => setMostrarAvisosConfirmados(true)}>
                  <BellIcon />
                  <DropdownLabel>
                    Avisos
                    {listaDeAvisos?.length > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold text-white bg-red-600 rounded-full w-5 h-5">
                        {listaDeAvisos.length}
                      </span>
                    )}
                  </DropdownLabel>
                </DropdownItem>

                <DropdownDivider />

                <DropdownItem href="/promocoes">
                  <TagIcon />
                  <DropdownLabel>Promoções</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/home" current={pathname.startsWith("/home")}>
                <CalendarDaysIcon />
                <SidebarLabel title="Dashboard">Dashboard</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                onClick={() => setMostrarAvisosConfirmados(true)}
                current={mostrarAvisosConfirmados}
              >
                <BellIcon />
                <SidebarLabel title="Avisos">
                  Avisos Gerais
                  {listaDeAvisosConfirmados?.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold text-white bg-red-600 rounded-full w-5 h-5">
                      {listaDeAvisosConfirmados.length}
                    </span>
                  )}
                </SidebarLabel>
              </SidebarItem>
              <SidebarItem
                onClick={() => setisModalAvisoOpen(true)}
                current={isModalAvisoOpen}
              >
                <BellIcon />
                <SidebarLabel title="Avisos Produtos">
                  Avisos Produtos
                  {produtos.produtos?.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold text-white bg-red-600 rounded-full w-5 h-5">
                      {produtos.produtos.length}
                    </span>
                  )}
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                onClick={() => setisOpenCaixaMensagens(true)}
                current={isOpenCaixaMensagens}
              >
                <ChatBubbleLeftIcon />
                <SidebarLabel title="Caixa De Mensagens dos clientes">
                  Mensagens Clientes
                  {caixaDeMensagens?.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold text-white bg-red-600 rounded-full w-5 h-5">
                      {caixaDeMensagens.length}
                    </span>
                  )}
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                onClick={() => setisOpenCaixaMensagens(true)}
                current={isOpenCaixaMensagens}
              >
                <ChatBubbleLeftIcon />
                <SidebarLabel title="Caixa De Mensagens para entregadores">
                  Mensagens Entregadores
                  {caixaDeMensagens?.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold text-white bg-red-600 rounded-full w-5 h-5">
                      {caixaDeMensagens.length}
                    </span>
                  )}
                </SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading className="text-md mt-2">Pedidos</SidebarHeading>

              <SidebarItem
                href="/Pedidos"
                current={pathname.startsWith("/Pedidos")}
              >
                <ShoppingCartIcon />
                <SidebarLabel title="Gerenciar Pedidos">Pedidos</SidebarLabel>
              </SidebarItem>
            </SidebarSection>


            <SidebarSection>
              <SidebarHeading className="text-md mt-2">
                Gestão de Produtos
              </SidebarHeading>

              <SidebarItem
                href="/Produtos"
                current={pathname.startsWith("/Produtos")}
              >
                <CubeIcon />
                <SidebarLabel title="Produtos Cadastrados">
                  Produtos
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Estoque"
                current={pathname.startsWith("/Estoque")}
              >
                <TagIcon />
                <SidebarLabel title="Estoque de Produto">Estoque</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Categorias"
                current={pathname.startsWith("/Categorias")}
              >
                <TagIcon />
                <SidebarLabel title="Categorias de Produto">
                  Categorias
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Fornecedores"
                current={pathname.startsWith("/Fornecedores")}
              >
                <TruckIcon />
                <SidebarLabel title="Cadastro de Fornecedores">
                  Fornecedores
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Mercadorias"
                current={pathname.startsWith("/Mercadorias")}
              >
                <BoxesIcon />
                <SidebarLabel title="Controle de Mercadorias">
                  Mercadorias
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/MetodosPagamento"
                current={pathname.startsWith("/MetodosPagamento")}
              >
                <CreditCardIcon />
                <SidebarLabel title="Métodos de Pagamento">
                  Métodos de Pagamento
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/AvisosProdutos"
                current={pathname.startsWith("/AvisosProdutos")}
              >
                <ExclamationCircleIcon />
                <SidebarLabel title="Avisos de Produto">
                  Avisos de Produto
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/PerguntasProdutos"
                current={pathname.startsWith("/PerguntasProdutos")}
              >
                <QuestionMarkCircleIcon />
                <SidebarLabel title="Perguntas sobre Produtos">
                  Perguntas
                </SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading className="text-md mt-2">
                Gestão de Compras & Estoque
              </SidebarHeading>

              <SidebarItem
                href="/configuracoes"
                current={pathname.startsWith("/configuracoes")}
              >
                <Cog6ToothIcon />
                <SidebarLabel title="Configurações de Compra">
                  Configurações
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/SetoresEstoque"
                current={pathname.startsWith("/SetoresEstoque")}
              >
                <BuildingStorefrontIcon />
                <SidebarLabel title="Setores de Estoque">
                  Setores de Estoque
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/ItensAuxiliares"
                current={pathname.startsWith("/ItensAuxiliares")}
              >
                <WrenchScrewdriverIcon />
                <SidebarLabel title="Itens Auxiliares">
                  Itens Auxiliares
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Cargos"
                current={pathname.startsWith("/Cargos")}
              >
                <IdentificationIcon />
                <SidebarLabel title="Cargos e Funções">Cargos</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Entregadores"
                current={pathname.startsWith("/Entregadores")}
              >
                <TruckIcon />
                <SidebarLabel title="Entregadores">Entregadores</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading className="text-md mt-2">
                Usuários e relacionados
              </SidebarHeading>

              <SidebarItem
                href="/Usuarios"
                current={pathname.startsWith("/Usuarios")}
              >
                <ClockIcon />
                <SidebarLabel title="Usuarios do sistema">
                  Usuários
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Cargos"
                current={pathname.startsWith("/Cargos")}
              >
                <MapPinIcon />
                <SidebarLabel title="Cargos">Cargos</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/AtividadesProgramadas"
                current={pathname.startsWith("/AtividadesProgramadas")}
              >
                <CalendarDaysIcon />
                <SidebarLabel title="Atividades Programadas">
                  Atividades Programadas
                </SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading className="text-md mt-2">
                Horários e Cobertura
              </SidebarHeading>

              <SidebarItem
                href="/Horarios"
                current={pathname.startsWith("/Horarios")}
              >
                <ClockIcon />
                <SidebarLabel title="Horários de Funcionamento">
                  Horários
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/CepsDisponiveis"
                current={pathname.startsWith("/CepsDisponiveis")}
              >
                <MapPinIcon />
                <SidebarLabel title="CEPs Atendidos">
                  CEPs Disponíveis
                </SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading className="text-md mt-2">
                Promoções e Avisos
              </SidebarHeading>

              <SidebarItem
                href="/Promocoes"
                current={pathname.startsWith("/Promocoes")}
              >
                <GiftIcon />
                <SidebarLabel title="Promoções Ativas">Promoções</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/ConfigPromocoes"
                current={pathname.startsWith("/ConfigPromocoes")}
              >
                <Cog6ToothIcon />
                <SidebarLabel title="Configuração de Promoções">
                  Configurar Promoções
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/ConfigAviso"
                current={pathname.startsWith("/ConfigAviso")}
              >
                <BellAlertIcon />
                <SidebarLabel title="Configuração de Avisos">
                  Configurar Avisos
                </SidebarLabel>
              </SidebarItem>
            </SidebarSection>


            <SidebarSection>
              <SidebarHeading className="text-md mt-2">Perfil</SidebarHeading>

              <SidebarItem
                href="/Perfil"
                current={pathname.startsWith("/Perfil")}
              >
                <UserCircleIcon />
                <SidebarLabel title="Informações do Perfil">
                  Informações Pessoais
                </SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/Política-privacidade"
                current={pathname.startsWith("/Política-privacidade")}
              >
                <ShieldCheckIcon />
                <SidebarLabel title="Privacidade">Privacidade</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading className="text-md mt-2">
                Suporte e Histórico
              </SidebarHeading>

              <SidebarItem
                href="/suporte"
                current={pathname.startsWith("/suporte")}
              >
                <LifebuoyIcon />
                <SidebarLabel title="Ajuda e Suporte">Suporte</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/registros-alteracoes"
                current={pathname.startsWith("/registros-alteracoes")}
              >
                <DocumentTextIcon />
                <SidebarLabel title="Registro de Alterações">
                  Histórico
                </SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src={`${user?.imagem_perfil ? user?.imagem_perfil : imgNotFound
                      }`}
                    className="size-6"
                    square
                    alt="Imagem de perfil"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium dark:text-white">
                      {user?.nome || "Seu Nome"}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user?.email || "exemplo@exemplo.com"}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
      {mostrarAvisos && (
        <ModalAvisosImportantes
          AvisosImportantes={listaDeAvisos}
          onClose={() => setMostrarAvisos(false)}
          onConfirm={confirmarAviso}
        />
      )}
      {mostrarAvisosConfirmados && (
        <ModalAvisosImportantes
          AvisosImportantes={listaDeAvisosConfirmados}
          onClose={() => setMostrarAvisosConfirmados(false)}
          onConfirm={confirmarAviso}
        />
      )}
      {isModalAvisoOpen && (
        <ModalAviso
          produtosVencimento={produtos?.produtosVencimento}
          produtosEstoqueBaixo={produtos?.produtosEstoqueBaixo}
          produtos={produtos.produtos}
          onClose={() => handleClose("Modal")}
        />
      )}
      {isPopUpAvisoOpen && (
        <AvisosProduto
          userName={user ? user.nome : "Sistema"}
          onClose={() => handleClose("PopUp")}
          onChangeAviso={handleChangeAviso}
        />
      )}

      <SliderOver
        title="Caixa de Mensagens"
        isOpenSliderbar={isOpenCaixaMensagens}
        handleClose={closeSlider}
        header={
          <header className="flex items-center justify-between border-b border-gray-200 px-6 py-6">
            {conversaSelecionada ? (
              <>
                <button
                  onClick={() => setConversaSelecionada(null)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                >
                  ⬅️ Voltar
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  📄 Baixar PDF
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Abrir Pedido #{conversaSelecionada.pedido.codigo_pedido}
                </button>
              </>
            ) : (
              <>
                <h2 className="text-base font-semibold text-gray-900">Conversas</h2>
                <a
                  href="#"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Ver todas
                </a>
              </>
            )}
          </header>
        }
        footer={
          conversaSelecionada && (
            <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="mt-2 flex items-center gap-2">
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={3}
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:outline-gray-600 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleEnviarMensagem}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Enviar
                </button>
              </div>
            </div>
          )
        }
      >
        <aside className="bg-white h-full overflow-y-auto border-l border-gray-200">


          {!conversaSelecionada ? (
            <ul role="list" className="divide-y divide-gray-200">
              {caixaDeMensagens.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="group flex items-start gap-x-4 px-6 py-5 transition hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAbrirConversaAdmin(item)} // <- função que marca como lida
                  >
                    <div className="relative">
                      <Image
                        src={item.cliente.imagem_perfil || imgNotFound}
                        alt={item.cliente.nome}
                        width={150}
                        height={150}
                        className="h-12 w-12 rounded-full object-cover bg-gray-100 border border-gray-300"
                      />
                      {/* Badge de não lido */}
                      {!item.leitura && (
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-bold text-sm">
                          #{item.pedido.codigo_pedido}
                        </span>
                        <time
                          dateTime={item.pedido.data_pedido}
                          className="text-xs text-gray-400"
                        >
                          {format(new Date(item.pedido.data_pedido), "dd/MM/yyyy")}
                        </time>
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900 truncate mt-1">
                        {item.cliente.nome}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 truncate">
                        {item.ultimaMensagem?.mensagem || "Nenhuma mensagem ainda."}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

          ) : (
            <div className="px-6 py-4 flex flex-col gap-3">
              {conversaSelecionada.mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${msg.remetente === "CLIENTE"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-indigo-600 text-white self-end"
                    } max-w-[70%]`}
                >
                  <p className="text-sm">{msg.mensagem}</p>
                  <p className="text-[10px] mt-1 text-right opacity-70">
                    {format(new Date(msg.enviado_em), "HH:mm")}
                  </p>
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>
          )}
        </aside>
      </SliderOver>

    </SidebarLayout>
  );
}
