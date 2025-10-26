#!/bin/bash -xe

set -euo pipefail

# Rebuild test image with dev dependencies
docker build --target test --build-arg INSTALL_DEV=true -t pkr-test -f Dockerfile .

# Start Postgres (in detached mode)
docker compose -f compose.yml up -d db

# Wait for Postgres to be ready
echo "Waiting for postgres..."
until docker compose exec -T db pg_isready -U pkr_user -d pkr_db; do
  sleep 1
done
echo "PostgreSQL started"

# Get the name of the docker-compose network
NETWORK_NAME=$(docker compose -f compose.yml ps -q db | xargs docker inspect -f '{{range .NetworkSettings.Networks}}{{.NetworkID}}{{end}}')
NETWORK_NAME=$(docker network inspect --format='{{.Name}}' $NETWORK_NAME)

# Run backend tests using the same network and env as compose
docker run --rm \
  -v "$(pwd):/app" \
  -w /app \
  --network "$NETWORK_NAME" \
  -e POSTGRES_DB="pkr_db" \
  -e POSTGRES_USER="pkr_user" \
  -e POSTGRES_PASSWORD="pkr_pass" \
  -e POSTGRES_HOST="db" \
  -e POSTGRES_PORT="5432" \
  -e DEBUG="1" \
  -e SECRET_KEY="ci-key" \
  -e ALLOWED_HOSTS="*" \
  -e STATIC_ROOT="/tmp/staticfiles" \
  -e GOOGLE_CLIENT_ID="ci-google-client-id" \
  -e GOOGLE_SECRET="ci-google-secret" \
  pkr-test make test-backend

# Run frontend tests
docker run --rm \
  -v "$(pwd):/app" \
  -w /app \
  node:20-slim bash -c "apt-get update -qq && apt-get install -y --no-install-recommends make && cd /app/src/frontend/ && npm ci && cd /app && make test-frontend"
