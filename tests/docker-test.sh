#!/bin/bash -xe

# Build Docker image
docker-compose -f compose.yml build

# Run migrations
docker-compose -f compose.yml run --rm pkr python src/manage.py test
