#!/bin/bash -xe
set -euo pipefail

# --- Backend lint ---
docker build --target test --build-arg INSTALL_DEV=true -t pkr-lint -f Dockerfile .

docker run --rm \
  -v "$(pwd):/app" \
  -w /app \
  -e POSTGRES_DB="pkr_db" \
  -e POSTGRES_USER="pkr_user" \
  -e POSTGRES_PASSWORD="pkr_pass" \
  -e POSTGRES_HOST="db" \
  -e POSTGRES_PORT="5432" \
  -e DEBUG="1" \
  -e SECRET_KEY="ci-key" \
  -e ALLOWED_HOSTS="*" \
  -e STATIC_ROOT="/tmp/staticfiles" \
  pkr-lint make lint-backend

# --- Frontend lint ---
docker run --rm \
  -v "$(pwd):/app" \
  -w /app \
  node:20-slim bash -c "apt-get update -qq && apt-get install -y --no-install-recommends make && cd /app/src/frontend/ && npm ci && cd /app && make lint-frontend"
