FROM node:alpine

COPY ./package.json ./my-app/
WORKDIR ./my-app
RUN npm install


COPY ./bumbaru/package.json ./my-app/bumbaru/
WORKDIR ./my-app/bumbaru/
RUN npm install


COPY ./.shared ./my-app/.shared

COPY ./bumbaru/ ./my-app/bumbaru/

WORKDIR ./my-app/bumbaru/
RUN npm run build
ENV BODY_SIZE_LIMIT 0
ENV PORT 80
EXPOSE 80
CMD ["node", "build"]