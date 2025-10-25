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
  --network "$NETWORK_NAME" \
  -e POSTGRES_DB=pkr_db \
  -e POSTGRES_USER=pkr_user \
  -e POSTGRES_PASSWORD=pkr_pass \
  -e POSTGRES_HOST=db \
  -e POSTGRES_PORT=5432 \
  -e DEBUG=1 \
  pkr-test bash -c "cd src && uv run pytest"

# Run frontend tests
docker run --rm \
  -v "$(pwd)/src/frontend:/app" \
  -w /app \
  node:20-slim bash -c "npm ci && npm run test -- --watch=false"
