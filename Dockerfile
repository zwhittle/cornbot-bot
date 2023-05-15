# Use the official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install any needed packages
RUN npm ci

# Copy the rest of the application source code into the container at /app
COPY . .

# Install TypeScript globally
RUN npm install -g ts-node typescript


# Run your TypeScript application using ts-node
CMD ["ts-node", "src/cornbot.ts"]
