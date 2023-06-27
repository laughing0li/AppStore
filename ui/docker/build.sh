#!/bin/bash -x

# This script builds a docker image of AppStore website

# Build docker image, assumes shell user id is a member of 'docker' group
docker system prune -af && docker build -t appstore -f docker/Dockerfile .
docker build -t appstore -f docker/Dockerfile .

# To run locally at port 4000:
# docker run -d -p 4000:80 --name appstore appstore

# To stop:
# docker ps
# docker stop <container_id>

# To run as shell:
# docker run -it -p 4000:80 appstore sh


