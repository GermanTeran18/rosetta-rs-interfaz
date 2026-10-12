#!/usr/bin/env python3
"""Compara cada página traducida de docs-es/ con su original.

Uso:
    python3 verificar_traduccion.py <carpeta original> [lista de rutas | -]

Sin lista, revisa todas las páginas .md del original. Sale con código 1 si hay problemas.
Revisa lo que una traducción nunca debe cambiar: bloques de código, destinos de enlaces y
número de títulos. También avisa de páginas vacías o que parecen sin traducir.
"""

import re
import sys
from pathlib import Path

DOCS_ES = Path(__file__).resolve().parent

FENCE = re.compile(r"^\s*```")
WIKI_LINK = re.compile(r"\[\[([^\]]*)\]\]")
MD_LINK = re.compile(r"\]\(([^)\s]*)")
SETEXT = re.compile(r"^[=-]{3,}\s*$", re.M)
ATX = re.compile(r"^#{1,6}\s", re.M)
WORD = re.compile(r"[A-Za-zÁÉÍÓÚÑáéíóúñü]{3,}")
# Palabras muy frecuentes en inglés y que no aparecen en español.
ENGLISH = {"the", "and", "with", "this", "that", "which", "from", "are", "will", "can", "you", "for", "not", "have", "should"}


def code_blocks(text):
    blocks, current, inside = [], [], False
    for line in text.splitlines():
        if FENCE.match(line):
            if inside:
                blocks.append("\n".join(current))
                current = []
            inside = not inside
        elif inside:
            current.append(line)
    return blocks


def link_targets(text):
    targets = []
    for inner in WIKI_LINK.findall(text):
        targets.append(inner.split("|")[-1].strip())
    targets.extend(MD_LINK.findall(text))
    return sorted(targets)


def headings(text):
    outside = []
    inside = False
    for line in text.splitlines():
        if FENCE.match(line):
            inside = not inside
        elif not inside:
            outside.append(line)
    body = "\n".join(outside)
    return len(ATX.findall(body)) + len(SETEXT.findall(body))


def prose_words(text):
    stripped = re.sub(r"```.*?```", " ", text, flags=re.S)
    stripped = re.sub(r"`[^`]*`", " ", stripped)
    stripped = re.sub(r"<[^>]+>", " ", stripped)
    stripped = re.sub(r"\[\[[^\]]*\]\]|\]\([^)]*\)", " ", stripped)
    return [w.lower() for w in WORD.findall(stripped)]


def english_ratio(text):
    words = prose_words(text)
    if len(words) < 40:
        return 0.0
    return sum(w in ENGLISH for w in words) / len(words)


def check(source_root, relative):
    source = (source_root / relative).read_text(encoding="utf-8", errors="replace")
    target_path = DOCS_ES / relative
    if not target_path.exists():
        return ["falta la traducción"]
    target = target_path.read_text(encoding="utf-8", errors="replace")
    problems = []
    if source.strip() and not target.strip():
        problems.append("la traducción está vacía")
    if code_blocks(source) != code_blocks(target):
        problems.append("los bloques de código no son idénticos al original")
    if link_targets(source) != link_targets(target):
        missing = set(link_targets(source)) - set(link_targets(target))
        extra = set(link_targets(target)) - set(link_targets(source))
        problems.append(f"destinos de enlaces distintos (faltan {sorted(missing)[:3]}, sobran {sorted(extra)[:3]})")
    if headings(source) != headings(target):
        problems.append(f"títulos: {headings(source)} en el original, {headings(target)} en la traducción")
    # En inglés estas palabras rondan el 8-12 % del texto; en una traducción, casi 0.
    if english_ratio(source) > 0.04 and english_ratio(target) > 0.03:
        problems.append(f"parece sin traducir ({english_ratio(target):.0%} de palabras típicas del inglés)")
    return problems


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    source_root = Path(sys.argv[1])
    if len(sys.argv) > 2:
        lines = sys.stdin if sys.argv[2] == "-" else open(sys.argv[2], encoding="utf-8")
        files = [line.strip() for line in lines if line.strip()]
    else:
        files = sorted(str(p.relative_to(source_root)) for p in source_root.rglob("*.md") if ".git" not in p.parts)

    failures = 0
    for relative in files:
        problems = check(source_root, relative)
        if problems:
            failures += 1
            for problem in problems:
                print(f"{relative}: {problem}")
    print(f"\n{len(files) - failures} de {len(files)} páginas sin problemas")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
