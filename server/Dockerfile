
FROM node:lts

# Working Directory
WORKDIR /app/server

# Copying the package and lock file
COPY package*.json .

# Installing the depedencies
RUN npm install --silent

# Src code
COPY . .

# Prisma client generate
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]