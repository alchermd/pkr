# pkr

## Local setup

```console
# Terminal A — Start the containers
cp .env.mk.example .env.mk   # Copy and edit environment variables as needed
make up                      # Build and start all services

# Terminal B — Initialize and run the frontend
make finit                   # Install dependencies
make fup                     # Run the frontend in watch/development mode
```

## Debugger Setup

Currently, Pycharm debugging is supported. Create a new Python Debug configuration with the following settings:

![img.png](./.github/img.png)

Next, run `make up`. This should start the containers and attach it to the debugger.
