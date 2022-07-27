FROM cypress/base:16.5.0

ENV CYPRESS_INSTALL_BINARY=https://cdn.cypress.io/beta/binary/8.5.1/linux-x64/circle-matth/fix/hang-investigation-5de30daa2d45fce9296fd1c9f91d6677b1eb6cf3/cypress.zip

RUN apt-get update && apt-get install -y jq

RUN adduser --disabled-password jahians

USER jahians
WORKDIR /home/jahians

COPY --chown=jahians:jahians package.json yarn.lock /home/jahians/

RUN mkdir -p /home/jahians/run-artifacts /home/jahians/results /home/jahians/cypress/plugins

#CI=true reduces the verbosity of the installation logs
RUN CI=true yarn install

COPY --chown=jahians:jahians . /home/jahians

RUN CI=true /home/jahians/node_modules/.bin/cypress install

CMD ["/bin/bash", "-c", "/home/jahians/env.run.sh"]
