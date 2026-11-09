# Mi-Opencode

Configuracion personal de opencode: skills, comandos y modelo.

## Que hay

- 58 skills en `config/opencode/skills/` (workflows, documentos, productividad, caveman).
- Comando `/bro` en `config/opencode/command/bro.md`.
- Modelo principal: `opencode/deepseek-v4-pro`. Subagentes: flash.
- MCP de memoria en `config/opencode/opencode.jsonc`.

## Restore

Clonar este repo y apuntar a la carpeta:

```bash
git clone <repo> && cp -r Mi-Opencode/config/opencode/* ~/.config/opencode/
```

## Tokens

Caveman + skills = menos salida, menos contexto gastado.
