.PHONY: help dev install build start lint

help:
	@echo "beneon — common commands"
	@echo ""
	@echo "  make dev      Start the local dev server (http://localhost:3000)"
	@echo "  make install  Install npm dependencies"
	@echo "  make build    Production build"
	@echo "  make start    Run production server (run make build first)"
	@echo "  make lint     Run ESLint"

dev:
	npm run dev

install:
	npm install

build:
	npm run build

start:
	npm run start

lint:
	npm run lint
