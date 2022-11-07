FROM node:16

# Create app directory
WORKDIR /usr/src/filmur


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./backend/package*.json ./backend/
COPY ./client/package*.json ./client/
COPY ./dev.sh ./


# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000



RUN chmod +x ./dev.sh
CMD ./dev.sh
