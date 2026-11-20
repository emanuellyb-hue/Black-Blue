// ==== DADOS ====
// Lista de produtos da loja (categoria: "maquiagem" ou "pijama")
const produtos = [
  { id: 1, nome: "Base Aveludada", cat: "maquiagem", preco: 59.9, icone: "🧴" },
  { id: 2, nome: "Batom Cereja", cat: "maquiagem", preco: 34.9, icone: "💄" },
  { id: 3, nome: "Paleta de Sombras Aurora", cat: "maquiagem", preco: 79.9, icone: "🎨" },
  { id: 4, nome: "Sérum Hidratante", cat: "maquiagem", preco: 64.9, icone: "✨" },
  { id: 5, nome: "Pijama Gatinhos", cat: "pijama", preco: 119.9, icone: "🐱" },
  { id: 6, nome: "Pijama Natal Aconchegante", cat: "pijama", preco: 139.9, icone: "🎄" },
  { id: 7, nome: "Pijama Unicórnio", cat: "pijama", preco: 129.9, icone: "🦄" },
  { id: 8, nome: "Pijama Astronauta", cat: "pijama", preco: 124.9, icone: "🚀" }
];

// Sugestões de base: combinação de tom + subtom
const bases = {
  "claro-frio":    { nome: "Porcelana Rosada", cor: "#f3d9d2" },
  "claro-neutro":  { nome: "Marfim Neutro",    cor: "#f0d3b8" },
  "claro-quente":  { nome: "Areia Dourada",    cor: "#ecc9a0" },
  "medio-frio":    { nome: "Bege Rosado",      cor: "#d9a98f" },
  "medio-neutro":  { nome: "Natural Médio",    cor: "#d2a075" },
  "medio-quente":  { nome: "Caramelo Suave",   cor: "#c78f5b" },
  "escuro-frio":   { nome: "Cacau Profundo",   cor: "#8a5a4a" },
  "escuro-neutro": { nome: "Castanha",         cor: "#7d5036" },
  "escuro-quente": { nome: "Mogno Dourado",    cor: "#6f4225" }
};

// Temas de pijama para a galeria
const temas = [
  { nome: "Animais", icone: "🐻", texto: "Gatinhos, ursinhos e pandas em tecido macio de algodão. Ideais para quem ama bichinhos." },
  { nome: "Personagens", icone: "🧙", texto: "Estampas de fantasia e aventura, em versões adulta e infantil, para dormir como um herói." },
  { nome: "Natal e datas", icone: "🎅", texto: "Coleções sazonais de Natal, Halloween e Dia dos Namorados. Ótimas para presentear." },
  { nome: "Fantasias", icone: "🧚", texto: "Unicórnios, sereias e fadas, com detalhes brilhantes e tecido leve." }
];

// ==== FUNÇÕES AUXILIARES ====
// Converte número em moeda brasileira
const moeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
// Atalho para buscar elementos
const $ = (id) => document.getElementById(id);

// ==== 1. TROCA DE MODO (glow <-> dreams) ====
const corpo = document.body;
$("btn-modo").addEventListener("click", () => {
  const noite = corpo.dataset.modo === "glow";
  corpo.dataset.modo = noite ? "dreams" : "glow";
  $("btn-modo").textContent = noite ? "Ver o modo dia" : "Ver o modo noite";
  $("btn-modo").setAttribute("aria-pressed", String(noite));
  // Textos e símbolo do início mudam conforme o modo
  $("astro").textContent = noite ? "☾" : "☀";
  $("hero-titulo").textContent = noite ? "Hora de sonhar com estilo." : "Brilho de dia, sonhos à noite.";
  $("hero-texto").textContent = noite
    ? "O dia acabou. Escolha um pijama temático, apague a luz e durma bem."
    : "Maquiagem para o seu rosto brilhar e pijamas temáticos para o seu sono ficar mais divertido. Tudo em um só lugar.";
  // Pequena animação na lua/sol
  $("astro").classList.add("gira");
  setTimeout(() => $("astro").classList.remove("gira"), 600);
});

// ==== MENU NO CELULAR ====
$("btn-hamburguer").addEventListener("click", () => {
  const aberto = $("menu").classList.toggle("aberto");
  $("btn-hamburguer").setAttribute("aria-expanded", String(aberto));
});
// Fecha o menu ao clicar em um link
$("menu").addEventListener("click", (e) => {
  if (e.target.tagName === "A") $("menu").classList.remove("aberto");
});

// ==== 2. PRODUTOS + FILTRO + CARRINHO ====
let carrinho = []; // itens: { id, nome, preco }

// Mostra os produtos da categoria escolhida
function mostrarProdutos(categoria) {
  const lista = categoria === "todos" ? produtos : produtos.filter((p) => p.cat === categoria);
  $("grade").innerHTML = lista.map((p) => `
    <article class="produto">
      <div class="icone" aria-hidden="true">${p.icone}</div>
      <h3>${p.nome}</h3>
      <span class="cat">${p.cat === "pijama" ? "Pijama temático" : "Maquiagem"}</span>
      <span class="preco">${moeda(p.preco)}</span>
      <button class="btn" data-id="${p.id}">Adicionar ao carrinho</button>
    </article>`).join("");
}

// Clique nos filtros
$("filtros").addEventListener("click", (e) => {
  const botao = e.target.closest(".filtro");
  if (!botao) return;
  document.querySelectorAll(".filtro").forEach((b) => b.classList.remove("ativo"));
  botao.classList.add("ativo");
  mostrarProdutos(botao.dataset.cat);
});

// Clique em "Adicionar ao carrinho"
$("grade").addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-id]");
  if (!botao) return;
  const produto = produtos.find((p) => p.id === Number(botao.dataset.id));
  carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco });
  atualizarCarrinho();
  $("msg-carrinho").textContent = "";
  botao.textContent = "Adicionado!";
  setTimeout(() => (botao.textContent = "Adicionar ao carrinho"), 900);
});

// Redesenha o carrinho, o total e o contador
function atualizarCarrinho() {
  $("contador").textContent = carrinho.length;
  $("lista-carrinho").innerHTML = carrinho.length
    ? carrinho.map((item, i) => `
        <li><span>${item.nome}<br>${moeda(item.preco)}</span>
        <button data-remover="${i}" aria-label="Remover ${item.nome}">Remover</button></li>`).join("")
    : "<li>Seu carrinho está vazio. Adicione um produto.</li>";
  $("total").textContent = moeda(carrinho.reduce((soma, item) => soma + item.preco, 0));
}

// Remover um item
$("lista-carrinho").addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-remover]");
  if (!botao) return;
  carrinho.splice(Number(botao.dataset.remover), 1);
  atualizarCarrinho();
});

// Abrir e fechar o painel do carrinho
function alternarCarrinho(abrir) {
  $("carrinho").classList.toggle("aberto", abrir);
  $("fundo").classList.toggle("aberto", abrir);
}
$("btn-carrinho").addEventListener("click", () => alternarCarrinho(true));
$("btn-fechar").addEventListener("click", () => alternarCarrinho(false));
$("fundo").addEventListener("click", () => alternarCarrinho(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") alternarCarrinho(false); });

// Esvaziar e finalizar
$("btn-limpar").addEventListener("click", () => {
  carrinho = [];
  atualizarCarrinho();
  $("msg-carrinho").textContent = "Carrinho esvaziado.";
});
$("btn-finalizar").addEventListener("click", () => {
  if (carrinho.length === 0) {
    $("msg-carrinho").textContent = "Adicione ao menos um produto para finalizar.";
    return;
  }
  const total = $("total").textContent;
  carrinho = [];
  atualizarCarrinho();
  $("msg-carrinho").textContent = `Pedido recebido! Total: ${total}. (Simulação: nenhum pagamento foi feito.)`;
});

// ==== 3. SIMULADOR DE TOM DE BASE ====
$("form-tom").addEventListener("submit", (e) => {
  e.preventDefault();
  const base = bases[`${$("tom").value}-${$("subtom").value}`];
  $("resultado-tom").innerHTML =
    `<span class="amostra" style="background:${base.cor}"></span>` +
    `Sugestão: <strong>${base.nome}</strong>. Teste a base na linha da mandíbula antes de comprar.`;
});

// ==== 4. GALERIA DE TEMAS DE PIJAMA ====
function mostrarTema(indice) {
  const tema = temas[indice];
  document.querySelectorAll(".aba").forEach((a, i) => a.classList.toggle("ativo", i === indice));
  $("painel-tema").innerHTML = `
    <div class="grande" aria-hidden="true">${tema.icone}</div>
    <div><h3>${tema.nome}</h3><p>${tema.texto}</p></div>`;
}
$("abas").innerHTML = temas.map((t, i) => `<button class="aba" data-tema="${i}">${t.nome}</button>`).join("");
$("abas").addEventListener("click", (e) => {
  const botao = e.target.closest(".aba");
  if (botao) mostrarTema(Number(botao.dataset.tema));
});

// ==== 5. FORMULÁRIO DE NOVIDADES COM VALIDAÇÃO ====
$("form-news").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = $("nome").value.trim();
  const email = $("email").value.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  // Mostra ou limpa cada erro
  $("erro-nome").textContent = nome.length < 2 ? "Digite seu nome (mínimo 2 letras)." : "";
  $("erro-email").textContent = emailValido ? "" : "Digite um e-mail válido, como voce@email.com.";
  $("nome").classList.toggle("invalido", nome.length < 2);
  $("email").classList.toggle("invalido", !emailValido);

  if (nome.length >= 2 && emailValido) {
    $("msg-news").textContent = `Cadastro feito, ${nome}! Seu cupom: GLOW10 (10% na primeira compra).`;
    $("form-news").reset();
  } else {
    $("msg-news").textContent = "";
  }
});

// ==== INICIALIZAÇÃO ====
mostrarProdutos("todos");
atualizarCarrinho();
mostrarTema(0);