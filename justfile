set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "node_modules/.bin/"
tsc := node_bin + "tsc"
biome := node_bin + "biome"
vite := node_bin + "vite"
drizzle := node_bin + "drizzle-kit"

# Default action
_:
    just lint
    just fmt

# Install
i:
    pnpm install

# Upgrade dependencies
up:
    pnpm up --interactive --latest --recursive

# Lint code with TypeScript Compiler
tsc:
    ./{{tsc}} --noEmit

# Lint code
lint:
    ls-lint
    typos
    just tsc

# Format code
fmt:
    ./{{biome}} check --write .

# Preprocess
pre:
    NODE_ENV=development ./{{drizzle}} push

# Start development server
dev:
    ./{{vite}}

# Preprocess for production
pre-prd:
    NODE_ENV=production ./{{drizzle}} push

# Build for production
build:
    ./{{vite}} build

# Production preview
start:
    node ./dist/index.js

# Clean builds
clean:
    rm -rf ./dist
    rm ./.cache.db

# Clean everything
clean-all:
    just clean
    rm -rf ./node_modules
