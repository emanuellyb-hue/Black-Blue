"""Cria a árvore de pastas/repositórios da loja Glow Dreams
(maquiagem e pijamas temáticos).

Uso:
    python arquivo.py
"""

from pathlib import Path

# Cada chave é uma pasta; o valor é um dict (subpastas) ou None (pasta vazia).
ARVORE = {
    "loja-glow-dreams": {
        "loja-web": {
            "src": {
                "paginas": {
                    "home": None,
                    "maquiagem": None,
                    "pijamas": None,
                    "kits-presente": None,
                },
                "componentes": None,
                "estilos": None,
            },
            "public": None,
        },
        "loja-mobile": None,
        "api-backend": {
            "src": {
                "modulos": {
                    "produtos": None,
                    "carrinho": None,
                    "pedidos": None,
                    "clientes": None,
                    "pagamentos": None,
                    "frete": None,
                },
                "config": None,
            },
            "tests": None,
        },
        "catalogo-maquiagem": {
            "bases": None,
            "batons": None,
            "sombras": None,
            "skincare": None,
            "tons-e-subtons": None,
        },
        "catalogo-pijamas": {
            "temas": {
                "animais": None,
                "personagens": None,
                "natal-e-datas": None,
                "fantasias": None,
            },
            "tabela-de-tamanhos": None,
            "tecidos": None,
        },
        "painel-admin": {
            "estoque": None,
            "pedidos": None,
            "relatorios": None,
        },
        "marketing": {
            "campanhas": None,
            "email-templates": None,
            "cupons-e-promocoes": None,
            "redes-sociais": None,
        },
        "design-system": {
            "tokens": None,
            "icones": None,
            "guia-de-marca": None,
        },
        "infra": {
            "docker": None,
            "ci-cd": None,
            "terraform": None,
        },
        "docs": {
            "arquitetura.md": "file",
            "api.md": "file",
            "guia-de-contribuicao.md": "file",
        },
    }
}


def criar(arvore: dict, base: Path) -> None:
    """Cria pastas (e arquivos marcados com 'file') recursivamente."""
    for nome, conteudo in arvore.items():
        caminho = base / nome
        if conteudo == "file":
            caminho.parent.mkdir(parents=True, exist_ok=True)
            caminho.touch(exist_ok=True)
        else:
            caminho.mkdir(parents=True, exist_ok=True)
            if isinstance(conteudo, dict):
                criar(conteudo, caminho)


def mostrar(arvore: dict, prefixo: str = "") -> None:
    """Imprime a árvore no terminal."""
    itens = list(arvore.items())
    for i, (nome, conteudo) in enumerate(itens):
        ultimo = i == len(itens) - 1
        print(f"{prefixo}{'└── ' if ultimo else '├── '}{nome}")
        if isinstance(conteudo, dict):
            mostrar(conteudo, prefixo + ("    " if ultimo else "│   "))


if __name__ == "__main__":
    criar(ARVORE, Path.cwd())
    mostrar(ARVORE)
    print("\nEstrutura criada com sucesso!")
