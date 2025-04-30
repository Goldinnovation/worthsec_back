# Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# Step 3: Install dependencies (Copy the root-level package.json files)
COPY package*.json ./

# Step 4: Install the root-level dependencies
RUN npm install


COPY dist ./dist

# Step 5: Copy the entire project into the container
COPY . .

ENV NODE_ENV=production


ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}



ARG DIRECT_URL

ENV DIRECT_URL=${DIRECT_URL}




ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}



ENV FRONT_API_URL="https://orbit-front-web.fly.dev"

# Copy the .env file into the image

# Step 6: Generate the Prisma Client
RUN npx prisma generate


# Step 7: Build the application
RUN npm run build




# Step 9: Expose the port your server will run on (e.g., 3000)
EXPOSE 3000

# Step 10: Run the server from the dist directory
CMD ["node", "dist/app.js"]