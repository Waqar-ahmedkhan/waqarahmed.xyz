# manixh-portfolio

> A React 19 + Vite portfolio template with comprehensive docs. Copy the
> documentation into your own project with one command.

## For Users

### Install

```bash
npx manixh-portfolio
```

Copies these files into your current directory:

| File | What it is |
|---|---|
| `AGENTS.md` | AI coding agent operating manual — what to keep, what to replace, step-by-step build instructions |
| `ARCHITECTURE.md` | Tech stack, folder structure, routing, data flow, build process |
| `COMPONENTS.md` | All reusable components with props, variants, and usage examples |
| `CONTENT_SCHEMA.md` | Data schemas and exactly where every piece of personal content lives |
| `DESIGN.md` | Design system reference — colors, typography, spacing, animations |
| `LICENSE` | MIT |

### Options

| Flag | Description |
|---|---|
| `--force`, `-f` | Skip overwrite confirmation |
| `--only=FILE1,FILE2` | Only copy specific files (by name without extension, case-insensitive) |
| `--help`, `-h` | Show help |

```bash
npx manixh-portfolio                           # all files, prompts before overwrite
npx manixh-portfolio --force                   # all files, no prompts
npx manixh-portfolio --only=AGENTS,LICENSE     # just those two
npx manixh-portfolio --only=DESIGN             # just one file
npx manixh-portfolio --only=agents --force     # combine flags
```

### Build With an AI Agent

After the files are installed, paste the
[build prompt](../../README.md#build-with-an-ai-coding-agent) (or
[cli/prompt.txt](./prompt.txt)) into your AI coding agent — Claude, opencode,
Codex, Cursor, Gemini, etc. — and it will build the portfolio strictly from the
spec files.

## For Contributors

### Tech Stack

React 19, Vite, TypeScript, plain CSS, react-icons, Firebase, pnpm, deployed
on Vercel.

### Project Structure

```
manixh/
├── cli/
│   ├── bin/index.js          # CLI entry point
│   ├── templates/            # documentation files (source of truth)
│   ├── .github/              # CI, issue templates, PR template
│   ├── package.json
│   ├── README.md             # this file
│   ├── CONTRIBUTING.md
│   ├── CODE_OF_CONDUCT.md
│   ├── CHANGELOG.md
│   ├── LICENSE
│   └── .gitignore
├── LICENSE
└── README.md
```

### Local Development

```bash
git clone https://github.com/ig-imanish/manixh.git
cd manixh/cli
npm link
cd /tmp/test && manixh-portfolio --force   # test it
npm unlink -g manixh-portfolio             # cleanup
```

### Run Without Installing

```bash
cd cli
node bin/index.js --force
```

### Publishing

```bash
cd cli/
npm version patch            # or minor / major
git push && git push --tags
npm publish --access public
```

### Docs

The six documentation files in `cli/templates/` are the source of truth.
They describe the portfolio template: architecture, components, content
schemas, the design system, and how an AI agent should build a new portfolio
from it.

| File | Covers |
|---|---|
| [AGENTS.md](./templates/AGENTS.md) | What to keep unchanged, what to replace, step-by-step instructions, constraints |
| [ARCHITECTURE.md](./templates/ARCHITECTURE.md) | Tech stack, folder structure, routing, data flow, env vars |
| [COMPONENTS.md](./templates/COMPONENTS.md) | Every component's props, variants, and usage |
| [CONTENT_SCHEMA.md](./templates/CONTENT_SCHEMA.md) | Data shapes, content locations, replacement checklist |
| [DESIGN.md](./templates/DESIGN.md) | Color palette, typography, spacing, radii, shadows, motion |

## License

MIT &copy; 2026 Manish Kumar — see [LICENSE](./LICENSE)