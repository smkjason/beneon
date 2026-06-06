.PHONY: help dev stop install build start lint

help:
	@echo "beneon — common commands"
	@echo ""
	@echo "  make dev      Start the local dev server (http://localhost:3000)"
	@echo "  make stop     Stop the local dev server (ports 3000 and 3001)"
	@echo "  make install  Install npm dependencies"
	@echo "  make build    Production build"
	@echo "  make start    Run production server (run make build first)"
	@echo "  make lint     Run ESLint"

dev:
	npm run dev

stop:
	@if lsof -ti :3000 >/dev/null 2>&1; then lsof -ti :3000 | xargs kill; fi
	@if lsof -ti :3001 >/dev/null 2>&1; then lsof -ti :3001 | xargs kill; fi
	@echo "Dev server stopped."

install:
	npm install

build:
	npm run build

start:
	npm run start

lint:
	npm run lint
