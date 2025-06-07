import { GetServerSideProps } from "next";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/16/solid";

const faqs = [
  {
    question: "Como cadastro um novo produto no sistema?",
    answer:
      "Acesse o módulo 'Admin', vá até a aba 'Produtos' e clique em 'Adicionar Produto'. Preencha as informações e salve.",
  },
  {
    question:
      "Posso controlar diferentes datas de validade para o mesmo produto?",
    answer:
      "Sim! O sistema permite registrar múltiplas entradas do mesmo produto com datas de validade distintas.",
  },
  {
    question: "Como adiciono um novo setor no meu estabelecimento?",
    answer:
      "Vá até 'Admin' > 'Setores' e clique em 'Novo Setor'. Defina o nome e vincule os produtos desejados.",
  },
  {
    question: "Como funciona o controle de estoque?",
    answer:
      "A cada entrada ou saída de produto, o sistema atualiza o estoque automaticamente. Você também pode fazer ajustes manuais.",
  },
  {
    question: "Clientes conseguem ver o cardápio atualizado?",
    answer:
      "Sim, qualquer alteração feita no módulo de cardápio é refletida automaticamente para os clientes na interface do cardápio online.",
  },
  {
    question: "Como configuro os horários de funcionamento da loja e delivery?",
    answer:
      "Acesse 'Admin' > 'Horários' e defina os dias e horários de abertura e entrega separadamente.",
  },
  {
    question: "É possível cadastrar múltiplos métodos de pagamento?",
    answer:
      "Sim. Em 'Admin' > 'Formas de Pagamento', você pode adicionar PIX, cartão, dinheiro, entre outros.",
  },
  {
    question: "Como gerencio os pedidos feitos pelo cliente?",
    answer:
      "Acompanhe todos os pedidos em tempo real na aba 'Pedidos'. É possível alterar status, ver detalhes e atualizar estoque automaticamente.",
  },
  {
    question: "Tem como automatizar pedidos pelo WhatsApp?",
    answer:
      "Sim! O sistema possui integração com bot do WhatsApp para pedidos, status e visualização do cardápio.",
  },
  {
    question: "Consigo ver relatórios de vendas e estoque?",
    answer:
      "Sim. Vá até a aba 'Relatórios' para visualizar dados de vendas, produtos mais vendidos e movimentação de estoque.",
  },
  {
    question: "Como altero as informações de um produto?",
    answer:
      "Acesse 'Produtos', clique sobre o produto desejado e edite nome, descrição, preço, imagem, entre outros campos.",
  },
  {
    question: "É possível desativar um produto sem excluí-lo?",
    answer:
      "Sim. Na tela de produtos, você pode desativar temporariamente um item para que ele não apareça no cardápio.",
  },
  {
    question: "Como adiciono imagens à galeria de um produto?",
    answer:
      "Ao editar um produto, use a seção 'Galeria de Imagens' para fazer upload de múltiplas fotos, que serão exibidas no cardápio.",
  },
  {
    question: "Consigo personalizar o visual do cardápio?",
    answer:
      "Sim, é possível alterar cores, estilos e categorias exibidas no cardápio pelo painel de administração.",
  },
  {
    question: "O sistema funciona em dispositivos móveis?",
    answer:
      "Sim! Tanto o painel administrativo quanto o cardápio são responsivos e adaptados para celulares e tablets.",
  },
  {
    question: "Como adiciono promoções nos produtos?",
    answer:
      "Acesse a aba 'Promoções', selecione os produtos e defina os descontos e período de validade da oferta.",
  },
  {
    question: "O que fazer se encontrar um erro no sistema?",
    answer:
      "Clique em 'Relatar Problema' no painel administrativo ou entre em contato com o suporte técnico via WhatsApp.",
  },
  {
    question: "Posso recuperar produtos ou dados apagados?",
    answer:
      "Entre em contato com o suporte para verificar a possibilidade de restauração dos dados perdidos.",
  },
  {
    question: "É possível ter mais de um administrador?",
    answer:
      "Sim. Você pode cadastrar múltiplos usuários e atribuir diferentes permissões no módulo 'Usuários'.",
  },
  {
    question: "Como exporto os dados do sistema?",
    answer:
      "Vá até 'Relatórios' e utilize a opção 'Exportar' para baixar dados em PDF, CSV ou Excel.",
  },
];

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Central de Suporte</h1>
        <p className="text-gray-600 mt-2">
          Encontre respostas para as perguntas mais frequentes ou entre em
          contato com a gente.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Perguntas Frequentes
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 hover:text-gray-600"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Fale Conosco</h2>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center gap-4">
            <EnvelopeIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">E-mail</h3>
              <p className="text-gray-600">comNectar-co@suporte.com</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <PhoneIcon className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Telefone</h3>
              <p className="text-gray-600">+55 71 997189443</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
              <p className="text-gray-600">
                <a
                  href="https://wa.me/5571997189443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Fale Conosco no WhatsApp
                </a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
