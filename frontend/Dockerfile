FROM node:16

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /frontend

# Install dependencies
RUN cd /frontend; \    
    chmod +x ./wait-for-it.sh; \
    npm install;  \
    npm run build

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["node", ""]
