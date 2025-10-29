-include .env.mk
SHELL := /bin/bash
APP_NAME := pkr
REGISTRY := registry.digitalocean.com/alcher-dev-registry
IMAGE_LATEST := $(REGISTRY)/$(APP_NAME):latest
IMAGE_UNIQUE := $(REGISTRY)/$(APP_NAME):$(shell git rev-parse --short HEAD)
DC := docker compose
MANAGE := $(DC) exec --workdir /app/src pkr python manage.py
UVR := uv run
DJ := cd src && $(UVR) python manage.py

.PHONY: \
	up dup dsmoke push shell migrate makemigrations createsuperuser \
	test dtest test-backend test-frontend \
	format lint lint-frontend lint-backend dlint\
	i idev finit fup \
	run \
	%

up:
	uv sync
	$(DJ) runserver

dup:
	$(DC) up --build

dsmoke:
	bash ./tests/docker-smoke.sh

# Push to DO Container Registry
push:
	# Login
	echo $(DO_TOKEN) | docker login $(REGISTRY) --username doctl --password-stdin
	# Build the Compose image
	$(DC) build $(APP_NAME)
	docker tag $(APP_NAME):latest $(IMAGE_LATEST)
	docker tag $(APP_NAME):latest $(IMAGE_UNIQUE)
	# Push both tags
	docker push $(IMAGE_LATEST)
	docker push $(IMAGE_UNIQUE)
	echo "Successfully pushed $(IMAGE_LATEST) and $(IMAGE_UNIQUE)"

shell:
	$(DJ) shell

migrate:
	$(DJ) migrate

makemigrations:
	$(DJ) makemigrations

createsuperuser:
	$(DJ) createsuperuser

test-backend:
	cd src && $(UVR) pytest

test-frontend:
	cd src/frontend && npm ci && npm run test -- --watch=false

test: test-backend test-frontend

dtest:
	bash ./tests/docker-test.sh

format:
	uv run ruff check  --fix
	uv run ruff format
	uv run djlint src --reformat --format-css --format-js
	cd src/frontend && npm run format
	cd src/frontend && npm run eslint

dlint:
	bash ./tests/docker-lint.sh

lint-frontend:
	cd src/frontend && npm run format:check
	cd src/frontend && npm run eslint -- --max-warnings=0

lint-backend:
	uv run ruff check 
	uv run ruff format --check
	uv run djlint src --check

lint: lint-backend lint-frontend

i:
	uv add $(pkg)

idev:
	uv add --dev $(pkg)

# Frontend commands
finit:
	cd src/frontend && npm install

fup:
	cd src/frontend && npm run dev

# Catch-all: forward any unknown target to manage.py
%:
	$(DJ) $@
