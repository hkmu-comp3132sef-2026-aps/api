set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "node_modules/.bin/"
tsc := node_bin + "tsc"
biome := node_bin + "biome"
vite := node_bin + "vite"

# Default action
_:
    just fmt
    just lint

# Install
i:
    pnpm install

# Upgrade dependencies
up:
    pnpm up --interactive --latest --recursive

# Format code
fmt:
    ./{{biome}} check --write .

# Lint code with TypeScript Compiler
tsc:
    ./{{tsc}} --noEmit

# Lint code
lint:
    ls-lint
    typos
    just tsc

# Start development server
dev:
    ./{{vite}}

# Build for production
build:
    ./{{vite}} build

# Production preview
start:
    node ./dist/index.js

# Clean builds
clean:
    rm -rf ./dist

# Clean everything
clean-all:
    just clean
    rm -rf ./node_modules
