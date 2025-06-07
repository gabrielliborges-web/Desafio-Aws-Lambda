import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Usuario } from "../types/Usuarios";

type CorRGB = [number, number, number];

type ProdutoFornecedor = {
  id: number;
  fornecedor_id: number;
  produto_id: number;
  fornecedor: {
    titulo: string;
    telefone: string;
    email: string;
  };
};

type Setor = {
  id: number;
  titulo: string;
  descricao: string;
};

type Produto = {
  id: number;
  titulo: string;
  validade: string;
  qtd_produto: number;
  tipo_alerta: "vencimento" | "estoque_baixo";
  setor_armazenado: Setor;
  produtofornecedor: ProdutoFornecedor[];
};

export function exportarProdutosAlertaPDF(
  produtos_alerta: any[], // ajuste o tipo se quiser: ProdutoAlerta[]
  user: Usuario | null
) {
  const doc = new jsPDF();
  let y = 15;

  const tiposAlerta: Record<
    string,
    {
      titulo: string;
      badge: string;
      cor: [number, number, number];
    }
  > = {
    vencimento: {
      titulo: "Produtos com Vencimento Próximo",
      badge: "Vencimento",
      cor: [255, 204, 0],
    },
    estoque_baixo: {
      titulo: "Produtos com Estoque Baixo",
      badge: "Estoque Baixo",
      cor: [0, 153, 255],
    },
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Relatório de Produtos (Validade, Estoque)", 14, y);
  y += 10;

  Object.entries(tiposAlerta).forEach(([tipo, config]) => {
    const produtosFiltrados = produtos_alerta.filter(
      (p) => p.tipo_alerta === tipo
    );
    if (produtosFiltrados.length === 0) return;

    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text(config.titulo, 14, y);
    y += 6;

    produtosFiltrados.forEach((produto) => {
      const { produto: prod, estoque } = produto;

      // Badge do tipo de alerta
      doc.setFillColor(...config.cor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.rect(14, y - 4, 40, 7, "F");
      doc.text(config.badge, 16, y + 1);
      y += 10;

      // Dados principais do produto
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("Produto:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(prod.titulo || "-", 40, y);
      y += 6;

      doc.setFont("helvetica", "bold");
      doc.text("Validade:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(estoque.validade?.split("T")[0] || "-", 40, y);
      y += 6;

      doc.setFont("helvetica", "bold");
      doc.text("Quantidade:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${estoque.qtd_produto ?? "-"}`, 40, y);
      y += 6;

      doc.setFont("helvetica", "bold");
      doc.text("Setor:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(prod.setor_armazenado?.titulo || "-", 40, y);
      y += 10;

      // Tabela de fornecedores (caso permitido)
      if (
        user?.perfil_usuario !== "FUNCIONARIO" &&
        prod.produtoFornecedor?.length > 0
      ) {
        autoTable(doc, {
          startY: y,
          head: [["Fornecedor", "Telefone", "E-mail"]],
          body: prod.produtoFornecedor.map((f: any) => [
            f.fornecedor?.titulo || "-",
            f.fornecedor?.telefone || "-",
            f.fornecedor?.email || "-",
          ]),
          styles: { fontSize: 9 },
          headStyles: {
            fillColor: [240, 240, 240],
            textColor: [33, 33, 33],
            halign: "center",
          },
          margin: { left: 14, right: 14 },
          theme: "grid",
          didDrawPage: (data: any) => {
            y = data.cursor.y + 8;
          },
        });
      }

      // Linha divisória entre produtos
      doc.setDrawColor(220);
      doc.line(14, y, 196, y);
      y += 10;

      // Quebra de página
      if (y > 270) {
        doc.addPage();
        y = 15;
      }
    });

    y += 6;
  });

  doc.save("relatorio_alertas_produtos.pdf");
}

export function gerarChecklistPDF(produtos: any[]) {
  const doc = new jsPDF();
  let y = 20;

  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Checklist de Produtos em Alerta", 14, y);
  y += 10;

  const produtosEmAlerta = produtos.filter((produto) =>
    produto.Avisos?.some(
      (aviso: any) => produto.qtd_produto <= aviso.quantidade
    )
  );

  if (produtosEmAlerta.length === 0) {
    doc.setFontSize(12);
    doc.text("Nenhum produto atingiu o limite configurado.", 14, y);
    doc.save("checklist_alertas.pdf");
    return;
  }

  // Cabeçalho
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(" ", 14, y); // espaço para checkbox
  doc.text("Produto", 24, y);
  doc.text("Qtd", 100, y);
  doc.text("Validade", 130, y);
  doc.text("Setor", 160, y);
  y += 6;

  doc.setDrawColor(200);
  doc.line(14, y, 196, y);
  y += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  produtosEmAlerta.forEach((produto: any) => {
    if (y > 260) {
      doc.addPage();
      y = 20;

      // Cabeçalho da nova página
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(" ", 14, y);
      doc.text("Produto", 24, y);
      doc.text("Qtd", 100, y);
      doc.text("Validade", 130, y);
      doc.text("Setor", 160, y);
      y += 6;

      doc.setDrawColor(200);
      doc.line(14, y, 196, y);
      y += 4;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    }

    // Checkbox
    doc.rect(14, y - 3, 4, 4);

    doc.text(produto.titulo, 24, y);
    doc.text(`${produto.qtd_produto}`, 100, y);
    doc.text(produto.validade?.split("T")[0] || "-", 130, y);
    doc.text(produto.setor_armazenado?.titulo || "-", 160, y);
    y += 8;

    // Fornecedores (se houver)
    if (produto.produtofornecedor?.length > 0) {
      autoTable(doc, {
        startY: y,
        head: [["Fornecedor", "Telefone", "E-mail"]],
        body: produto.produtofornecedor.map((f: any) => [
          f.fornecedor?.titulo || "-",
          f.fornecedor?.telefone || "-",
          f.fornecedor?.email || "-",
        ]),
        styles: { fontSize: 9 },
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [33, 33, 33],
          halign: "center",
        },
        margin: { left: 24, right: 14 },
        theme: "grid",
        didDrawPage: (data: any) => {
          y = data.cursor.y + 6;
        },
      });
    }

    // Linha separadora entre produtos
    doc.setDrawColor(220);
    doc.line(14, y, 196, y);
    y += 6;
  });

  doc.save("checklist_produtos.pdf");
}
