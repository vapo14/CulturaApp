#!/bin/bash

# install dependencies on server and client

npm i --prefix ./backend

npm i --prefix ./client

# Start the first process
npm run-script dev --prefix ./backend &
  
# Start the second process
npm start --prefix ./client &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?