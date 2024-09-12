FROM node:bullseye AS development

WORKDIR /app
COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY .swcrc .swcrc

COPY nest-cli.json nest-cli.json
RUN npm install
RUN  chown -R  node:node /app
RUN apt update && apt install -y openssh-client
USER node

FROM node:bullseye-slim AS production

ARG NODE_ENV production
ENV NODE_ENV ${NODE_ENV}
WORKDIR /app
COPY package.json ./
RUN npm install --prod
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main"]
EXPOSE 3000