FROM node:16

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /api-gateway

# Install dependencies
RUN cd /gateway; \    
    chmod +x ./wait-for-it.sh; \
    npm install;  \
    npm run build

# Expose our server port.
EXPOSE 8080

# Run our app.
CMD ["node", ""]
