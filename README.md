# Docker commands

docker build
docker pull
docker run
docker version

# docker file

FROM node:20
LABEL name=myapp
ARG APP_DIR=/app
WORKDIR ${APP_DIR}
ADD main.js .
ADD package.json . ADD public public
RUN npm ci
ENV APP_PORT=3000
EXPOSE ${APP_PORT}
ENTRYPOINT node main.js ${APP_PORT}

# build an image

docker build --build-arg APP_DIR=/tmp –t myapp:v1

# Starting a Docker Container :

docker container run –d –p 8080:3000 --name app myapp:v1

# Port Binding : -p flag

docker run –d –p 8080:3000 --name app myapp:v1

# Setting Environment Variables : -e flag

docker run –d –p 8080:5000 -e APP_PORT=5000 --name app myapp:v1

# List all running containers

docker container ps

# Stop a container

docker container stop mycontainer

# Start a container

docker container start mycontainer

# Delete a container

docker container rm mycontainer

# List all images

docker image ls

# remove docker image

docker rmi myimage:v1

# Running Command Inside Containers

docker container exec -ti mycontainer ls -l

## Pushing Images to Container Registry

# Login to Docker hub

       docker login -u fred

# Login to other container registry eg. Github

echo $PASSWORD | docker login ghcr.io -u fred --password-stdin

# Push or pull from container registry

docker push fred/myapp:v1
docker pull ghcr.io/fred/myapp:v1

# view Image Layers

docker history myapp:v1

# Observability - Docker

HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \  
CMD curl -s -f http://localhost:${APP_PORT}/ready > /dev/null || exit 1

# Two ways of mapping external storage into Docker

    Bind mount - mount a directory from the Docker host into the container
    Volume mount - create a Docker volume and mount the volume into the container

# Bind Mount

docker run –d –p 8080:3000 –-mount type=bind,src=/opt/shared,dst=/app/public,readonly --name app myapp:v1

## Volume Management

# Create a volume

    docker volume create myvol

# List available volumes

    docker volume ls

# Display the properties of a volume

    docker volume inspect myvol

# Delete a volume

    docker volume rm myvol

# Creating and Mounting a Volume

    docker volume create shared
    docker run –d –p 3000-3100:3000  --mount type=volume,src=shared,dst=/app/public  --name app0 myapp:v1

## Networking

Docker Network - Bridge
Docker Network - Host
Docker Networking - Overlay

# Attaching to Network

    docker run –d –p 8080:3000 --name app myapp:v1

    docker network create –d bridge mynet

    docker run -d -p 8080:3000 --network mynet --name app myapp:v1

    docker network inspect mynet --format `{{json .Containers}}`

# Network Management

# Create a network

    docker network create -d bridge mynet

# List available network

     docker network ls

# Display network properties

    docker network inspect mynet

# Delete a network

    docker network rm mynet

## Deploying Application Stack with Docker

docker create network -d bridge app-net

docker create volume data

docker run –d --network app-net --name db northwind-db:v1

docker run –d –p 8080:3000 -v data:/app/public --network app-net --name app nortwind-app:v1

# Docker Networking - Macvlan

## docker compose

    docker-compose up -d

## list container mentsioned in the docker compose

    docker compose ps

## down docker comose

    docker-componse down

kubectl clusrer-info

## setup

create folder $HOME/.kube/
donwload k8s-cfdsa-kubeconfig.yaml to $HOME/.kube/
cp k8s-cfdsa-kubeconfig.yaml config

## 1. create namespace, configmap and secret

    kubectl apply -f config.yaml

## 2. run db deployment and services

    kubectl apply -f bggdb.yaml

## 3. run app deployment and services

    kubectl apply -f bggapp.yaml

## 4. get namespace

kubectl get namespace

## 5. configmap

    kubectl get configmaps -n bggns
    kubectl describe configmap bgg-cm  -n bggns

## 6. secret

kubectl get secrets -n bggns

## 7. list all deployments

    kubectl get deployments -n bggns
    kubectl describe deployment bggdb-deploy -n bggns

## 8. list all services

    kubectl get services -n bggns
     kubectl describe  service bggdb-svc -n bggns

## 9. delete namespace, configmap and secret

    kubectl delete -f config.yaml

## 10. delete db deployment and services

    kubectl delete -f bggdb.yaml

## 11. delete app deployment and services

    kubectl delete -f bggapp.yaml
