# pkr

## Local setup

## Requirements:

- `uv`
- `docker`
- `psql`

```console
# Setup database
createdb pkr

# Terminal A — Start Django
cp src/.env.example src/.env  # Copy example env file, update as needed
make up # Start backend and database

# Terminal B — Initialize and run the frontend
make finit                   # Install dependencies
make fup                     # Run the frontend in watch/development mode
```

## Debugging with PyCharm

Included is a PyCharm run configuration, and should work out of the box if you open the project root in PyCharm. To debug, use the `pkr`
run configuration.
