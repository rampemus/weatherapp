FROM node:10.16.3
WORKDIR /backend
COPY . .
RUN npm install
ENV REFRESH_INTERVAL=10
EXPOSE 9000
ENTRYPOINT ["npm","run","dev"]
