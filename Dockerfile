FROM node:16

# Create app directory
WORKDIR /culturaapp

# Bundle app source
COPY . .

RUN npm i --prefix ./backend
RUN npm i --prefix ./client

RUN npm run build --prefix ./client

RUN mv ./client/build/ ./backend/build/

# Expose port 3000
EXPOSE 3000

CMD node ./backend/index.js
