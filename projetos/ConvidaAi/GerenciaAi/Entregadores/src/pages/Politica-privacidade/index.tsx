"use client";

import {
  ShieldCheckIcon,
  LockClosedIcon,
  InformationCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function PrivacyPolicy() {
  return (
    <div className=" p-2">
      <div className="min-h-screen bg-white p-2">
        <div className="max-w-5xl mx-auto py-12 px-6 sm:px-10 lg:px-16">
          <h1 className="text-4xl font-extrabold text-blue-900 text-start mb-10">
            <span className="block">Política de Privacidade</span>
          </h1>
          <p className="text-gray-700 text-start mb-12 text-lg">
            Sua privacidade é nossa prioridade. Saiba como cuidamos das suas
            informações e garantimos a segurança dos seus dados.
          </p>

          <section className="mb-12">
            <div className="flex items-start mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-blue-500 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-900">
                Informações que Coletamos
              </h2>
            </div>
            <p className="text-gray-600">
              Coletamos informações que você nos fornece diretamente, como ao se
              registrar em nosso site ou preencher formulários. Também coletamos
              dados automaticamente, como informações de navegação e cookies.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-start mb-4">
              <GlobeAltIcon className="h-8 w-8 text-green-500 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-900">
                Como Usamos Suas Informações
              </h2>
            </div>
            <ul className="list-disc pl-10 space-y-2 text-gray-600">
              <li>Para melhorar sua experiência em nosso site;</li>
              <li>Para personalizar conteúdos e ofertas;</li>
              <li>Para processar suas solicitações e prestar suporte;</li>
              <li>Para cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex items-start mb-4">
              <LockClosedIcon className="h-8 w-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-900">
                Proteção de Dados
              </h2>
            </div>
            <p className="text-gray-600">
              Implementamos medidas técnicas e organizacionais avançadas para
              proteger suas informações contra acesso não autorizado, alteração,
              divulgação ou destruição.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-start mb-4">
              <InformationCircleIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-900">
                Seus Direitos
              </h2>
            </div>
            <p className="text-gray-600">
              Você tem o direito de acessar, corrigir ou excluir suas
              informações pessoais. Caso tenha dúvidas ou queira exercer seus
              direitos, entre em contato conosco.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-start mb-4">
              <GlobeAltIcon className="h-8 w-8 text-purple-500 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-900">
                Alterações nesta Política
              </h2>
            </div>
            <p className="text-gray-600">
              Podemos atualizar esta política de tempos em tempos. Notificaremos
              você sobre mudanças importantes por meio do nosso site ou outros
              canais apropriados.
            </p>
          </section>

          <footer className="mt-16 border-t pt-6 text-start">
            <p className="text-gray-600">
              Última atualização:{" "}
              <span className="font-medium">22 de Dezembro de 2024</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
