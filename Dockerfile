FROM node:8

RUN useradd --user-group --create-home --shell /bin/false app_user

ENV HOME=/home/app_user
ENV TERM=xterm

WORKDIR ${HOME}/ranglin

COPY package.json yarn.lock ./

RUN yarn
VOLUME ${HOME}/ranglin/node_modules

CMD yarn start
