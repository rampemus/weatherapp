FROM node:10.16.3
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build --prod
RUN npm install -g serve
EXPOSE 3000
ENTRYPOINT ["serve","-s","build","-l","3000"]
