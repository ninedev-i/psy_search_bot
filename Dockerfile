FROM node:16.13.1-alpine as builder

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock /home/node/app/

RUN touch .env && yarn install --frozen-lockfile

COPY --chown=node:node  . /home/node/app/

RUN yarn build

FROM builder

USER node

COPY --chown=node:node --from=builder /home/node/app/build ./build

EXPOSE 2222

CMD sh -c 'node --experimental-modules --no-warnings --es-module-specifier-resolution=node build/index.js'