import { useRouter } from "next/router";
import { Lock } from "lucide-react";

const AcessoNegado = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Acesso Negado
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Você não tem permissão para visualizar esta página ou recurso.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => router.push("/home")}
            className="rounded-sm bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    </main>
  );
};

export default AcessoNegado;
