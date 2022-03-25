FROM node:16

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /logging-service

# Install dependencies
RUN cd /logging-service; \
    npm install;  \
    npm run build

# Expose our server port.
EXPOSE 8081

# Run our app.
CMD ["NODE_PATH=./dist", "node", "dist/server.js"]
