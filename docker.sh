#!/bin/sh

case "$1" in
    dev)
        docker compose --env-file .env.dev -f docker-compose-dev.yaml up --build
        ;;
    dev-d)
        docker compose --env-file .env.dev -f docker-compose-dev.yaml up --build -d
        ;;
    prod)
        docker compose --env-file .env.prod -f docker-compose-prod.yaml up --build
        ;;
    *)
        echo "Usage: $0 {dev|dev-d|prod}"
        exit 1
        ;;
esac