FROM node:alpine

RUN mkdir frontend && chown node ./frontend/

WORKDIR /frontend

COPY package.json .
RUN npm install
COPY . .
RUN npm config set unsafe-perm=true
RUN npm run build --prod

RUN npm install -g serve
EXPOSE 3000

USER node
ENTRYPOINT ["serve","-s","build","-l","3000"]
