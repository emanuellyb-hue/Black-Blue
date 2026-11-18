# Glow Dreams

Estrutura de repositórios para uma loja online de **maquiagem** e **pijamas temáticos**.

## Como usar

O script `arquivo.py` cria toda a árvore de pastas na pasta atual:

```bash
python arquivo.py
```

Não há dependências obrigatórias (veja `requirements.txt`).

## Estrutura

```
loja-glow-dreams/
├── loja-web/              # Frontend da loja (vitrine)
├── loja-mobile/           # App iOS/Android
├── api-backend/           # API principal
├── catalogo-maquiagem/    # Dados e regras de maquiagem
├── catalogo-pijamas/      # Dados e regras de pijamas
├── painel-admin/          # Gestão interna
├── marketing/             # Campanhas, e-mails, cupons e redes sociais
├── design-system/         # Cores, fontes, ícones e guia de marca
├── infra/                 # Deploy e servidores
└── docs/                  # Documentação
```

## Descrição dos repositórios

| Pasta | O que contém |
|---|---|
| `loja-web` | Páginas da vitrine: home, maquiagem, pijamas e kits de presente, além de componentes e estilos. |
| `loja-mobile` | Aplicativo para iOS e Android. |
| `api-backend` | Módulos de produtos, carrinho, pedidos, clientes, pagamentos e frete, com testes. |
| `catalogo-maquiagem` | Bases, batons, sombras, skincare e tons/subtons. |
| `catalogo-pijamas` | Temas (animais, personagens, natal e datas, fantasias), tabela de tamanhos e tecidos. |
| `painel-admin` | Estoque, pedidos e relatórios. |
| `marketing` | Campanhas, templates de e-mail, cupons e promoções, redes sociais. |
| `design-system` | Tokens de design, ícones e guia de marca. |
| `infra` | Docker, CI/CD e Terraform. |
| `docs` | `arquitetura.md`, `api.md` e `guia-de-contribuicao.md`. |

## Personalização

A árvore está definida no dicionário `ARVORE` no topo do `arquivo.py`. Para adicionar, remover ou renomear pastas, basta editar esse dicionário e rodar o script novamente.

## Contribuindo

Consulte `docs/guia-de-contribuicao.md` antes de abrir um pull request.
