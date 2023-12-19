
FROM node:lts

# Working Directory
WORKDIR /app/client

# Copying the package and lock file
COPY package*.json .

# Installing the depedencies
RUN npm install --silent

# Src code
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]