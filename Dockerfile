# --- Node build stage ---
FROM node:20-slim AS node_builder
WORKDIR /build
# Copy only frontend files first for better caching
COPY src/frontend/package*.json src/frontend/ ./frontend/
WORKDIR /build/frontend
RUN npm ci
COPY src/frontend /build/frontend
RUN npm run build
# build output will be /build/frontend/dist

# --- Builder stage ---
FROM python:3.12-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml uv.lock ./

ARG INSTALL_DEV=false

RUN pip install --no-cache-dir uv \
    && if [ "$INSTALL_DEV" = "true" ]; then \
         uv sync --frozen --python=$(which python3); \
       else \
         uv sync --frozen --no-dev --python=$(which python3); \
       fi

COPY --from=node_builder /build/frontend/dist /app/src/frontend/dist

COPY src/ ./src

RUN find /app/.venv -type d -name "__pycache__" -exec rm -rf {} + \
 && find /app/.venv -type f -name "*.pyc" -delete \
 && rm -rf /app/.venv/lib/python*/site-packages/tests \
 && rm -rf /root/.cache

# --- Final stage ---
FROM python:3.12-slim

# Install only runtime deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy prebuilt venv and app
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/src /app/src
COPY entrypoint.sh /app/entrypoint.sh

ENV PATH="/app/.venv/bin:$PATH"

# Create log files
RUN mkdir -p /app/src/logs
RUN touch /app/src/logs/gunicorn-access.log
RUN touch /app/src/logs/gunicorn-error.log

# Create frontend dist dir
RUN mkdir -p /app/src/frontend/dist

ENTRYPOINT ["/app/entrypoint.sh"]
CMD [ \
    "gunicorn", \
     "--chdir", "/app/src", \
     "--access-logfile", "/app/src/logs/gunicorn-access.log", \
     "--error-logfile", "/app/src/logs/gunicorn-error.log", \
     "config.wsgi:application", \
     "--bind", "0.0.0.0:8000" \
]
