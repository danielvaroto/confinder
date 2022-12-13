# How to run app locally:

Prerequisites:

- Install [docker desktop](https://www.docker.com/products/docker-desktop/) or [rancher desktop](https://rancherdesktop.io/).

To run the crawler that will insert conferences in the database:

- On the terminal run: `docker-compose up console`

To run the aspnet api and react web apps:

- On the terminal run: `docker-compose up web -d`
  - `-d` will make the containers run in the background

To stop and destroy all created containers:

- On the terminal run: `docker-compose down`
