FROM node:16

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /logging-service

# Install dependencies
RUN cd /logging-service; \    
    chmod +x ./wait-for-it.sh; \
    npm install;  \
    npm run build

# Expose our server port.
EXPOSE 8081

# Run our app.
CMD ["node", ""]
