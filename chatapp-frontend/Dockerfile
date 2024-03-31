FROM node:18.16.0-alpine3.17


WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 
CMD ["npm", "start"]