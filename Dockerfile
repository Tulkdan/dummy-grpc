FROM node:latest

# Set the working directory.
WORKDIR /app

COPY . /app

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 50052

# Run the specified command within the container.
CMD [ "node", "src/server/division.js" ]
