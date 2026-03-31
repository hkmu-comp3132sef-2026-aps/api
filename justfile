set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsc"
biome := "pnpm exec biome"
vite := "pnpm exec vite"

# Default action
_:
    just --list -u

# Install
i:
    pnpm install

# Install with frozen-lockfile
if:
    pnpm install --frozen-lockfile

# Upgrade dependencies
up:
    pnpm up --interactive --latest --recursive

# Format code
fmt:
    {{biome}} check --write .

# Lint code with ls-lint
ls-lint:
    cd ./src && ls-lint -config ../.ls-lint.yaml

# Lint code with ls-lint
lslint:
    just ls-lint

# Lint code with typos
typos:
    typos

# Lint code with TypeScript Compiler
tsc:
    {{tsc}} --noEmit

# Lint code
lint:
    just lslint
    just typos
    just tsc

# Check code
check:
    just fmt
    just lint

# Start development server
dev:
    {{vite}} dev

# Build for production
build:
    {{vite}} build

# Production preview
start:
    node ./dist/index.js

# Clean builds (Linux)
clean-linux:
    rm -rf ./dist

# Clean builds (macOS)
clean-macos:
    just clean-linux

# Clean builds (Windows)
clean-windows:
    Remove-Item -Recurse -Force ./dist

# Clean
clean:
    just clean-{{os()}}

# Clean everything (Linux)
clean-all-linux:
    just clean

    rm -rf ./node_modules

# Clean everything (macOS)
clean-all-macos:
    just clean-all-linux

# Clean everything (Windows)
clean-all-windows:
    just clean

    Remove-Item -Recurse -Force ./node_modules

# Clean everything
clean-all:
    just clean-all-{{os()}}
