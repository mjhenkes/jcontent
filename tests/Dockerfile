FROM cypress/base:16.5.0

ENV CYPRESS_INSTALL_BINARY=https://cdn.cypress.io/beta/binary/8.6.0/linux-x64/circle-matth/fix/hang-investigation-3f7fc207041a9a8a41083420b61d2f75c2727b93/cypress.zip

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
