const { execSync } = require("child_process");

const mensagem = process.argv.slice(2).join(" ");

if (!mensagem) {
  console.error("❌ Você precisa fornecer uma mensagem de commit!");
  console.error('Exemplo: npm run autopush "ajuste na tela de login"');
  process.exit(1);
}

try {
  console.log("🚀 Executando git add...");
  execSync("git add .", { stdio: "inherit" });

  console.log(`🚀 Executando git commit -m "${mensagem}"...`);
  execSync(`git commit -m "${mensagem}"`, { stdio: "inherit" });

  console.log("🚀 Executando git push...");
  execSync("git push origin master", { stdio: "inherit" });

  console.log("✅ Push realizado com sucesso!");
} catch (error) {
  console.error("❌ Ocorreu um erro durante o autopush.");
  process.exit(1);
}
