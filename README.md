# Vite + Hono + OpenAPI + TypeScript

This template provides a setup to get Hono working in Vite with OpenAPI and TypeScript.

## Dependencies

Please install the following dependencies:

| Dependencies                                   | Description                            |
| ---------------------------------------------- | -------------------------------------- |
| [Node.js](https://nodejs.org/en)               | JavaScript runtime                     |
| [pnpm](https://pnpm.io/)                       | Package manager for Node.js            |
| [just](https://just.systems)                   | Command runner                         |
| [ls-lint](https://ls-lint.org/)                | Linting tool for directories and files |
| [typos-cli](https://github.com/crate-ci/typos) | Spell checker                          |

## Commands

The following commands are available:

### Installing

This command will install Node.js dependencies.

```sh
just i
```

### Upgrading

This command will upgrade Node.js dependencies.

```sh
just up
```

### Default Command

This command will do formatting and linting.

```sh
just
```

### Linting

This command will lint the code.

```sh
just lint
```

### Formatting

This command will format the code.

```sh
just fmt
```

### Development

This command will start the development server.

```sh
just dev
```

### Production

This command will build the code and start the production server.

```sh
just build
just start
```
