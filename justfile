set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsc"
biome := "pnpm exec biome"
vite := "pnpm exec vite"

# Default action
_:
    just lint
    just fmt

# Install
i:
    pnpm install

# Install with frozen-lockfile
if:
    pnpm install --frozen-lockfile

# Upgrade dependencies
up:
    pnpm up --interactive --latest --recursive

# Lint code with TypeScript Compiler
tsc:
    {{tsc}} --noEmit

# Lint code
lint:
    cd ./src && ls-lint -config ../.ls-lint.yaml
    typos
    just tsc

# Format code
fmt:
    {{biome}} check --write .

# Start development server
dev:
    {{vite}}

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

