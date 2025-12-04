#!/bin/bash

# Fail on any error
set -e

echo "Starting deployment process..."

if [ -z "$PORT" ]; then
    echo "Warning: PORT is not set, defaulting to 3000"
    PORT=3000
fi

# Login to GitHub Container Registry
echo "Logging into GitHub Container Registry..."
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Stop and remove existing container
echo "Stopping and removing existing container..."
if [ "$(docker ps -q -f name=asistify-frontend)" ]; then
    docker stop asistify-frontend
fi

if [ "$(docker ps -aq -f name=asistify-frontend)" ]; then
    docker rm asistify-frontend
fi

# Remove existing image
echo "Removing existing image..."
if [ "$(docker images -q $IMAGE_TAG)" ]; then
    docker rmi $IMAGE_TAG
fi

# Pull the latest image
echo "Pulling image: latest $IMAGE_TAG"
docker pull $IMAGE_TAG

# Run the new container
echo "Starting new container on port $PORT..."
docker run -d \
  --name asistify-frontend \
  --restart unless-stopped \
  --network asistify-network \
  -p $PORT:8080 \
  $IMAGE_TAG

# Prune unused images to save space
docker image prune -f

echo "Deployment successful!"
