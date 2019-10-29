FROM node:alpine

RUN mkdir backend && chown node ./backend/

USER node

WORKDIR /backend
COPY . .
RUN npm install
ENV REFRESH_INTERVAL=10
EXPOSE 9000
ENTRYPOINT ["npm","start"]
