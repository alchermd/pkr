#!/bin/bash -xe
set -euo pipefail

# --- Backend lint ---
docker build --target test --build-arg INSTALL_DEV=true -t pkr-lint -f Dockerfile .

docker run --rm \
  -v "$(pwd):/app" \
  -w /app \
  pkr-lint make lint-backend

# --- Frontend lint ---
docker run --rm \
  -v "$(pwd):/app" \
  -w /app \
  node:20-slim bash -c "apt-get update -qq && apt-get install -y --no-install-recommends make && make lint-frontend"
