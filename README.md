# Hong Kong Schools API

This is an API for retrieving information about schools in Hong Kong.

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

### Preprocessing

This command will do preprocessing for the server.

```sh
just pre
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
