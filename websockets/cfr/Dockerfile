FROM node:alpine

WORKDIR /my-app

COPY package.json ./
RUN npm install

COPY websockets/cfr/package.json ./websockets/cfr/
COPY unit_testing/ROUTING/ ./unit_testing/ROUTING/
WORKDIR /my-app/websockets/cfr
RUN npm install

WORKDIR /my-app
COPY .shared ./.shared
RUN ls -la /my-app/.shared
COPY websockets ./websockets

WORKDIR /my-app/websockets/cfr
ENV BODY_SIZE_LIMIT 0
ENV PORT 80
EXPOSE 80

CMD ["node", "index.js"]
