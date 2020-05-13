FROM mhart/alpine-node:13 AS baseImage

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --production --ignore-optional

###############################################################################
FROM baseImage AS builder

RUN yarn global add serve

ENTRYPOINT ["node", "./node_modules/bin/serve"]
CMD ["--listen 8000", "--single", "build"]