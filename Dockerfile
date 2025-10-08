# 1. Use official Node image
FROM node:22-slim AS builder

RUN apk add --no-cache ca-certificates && update-ca-certificates

# 2. Set working directory
WORKDIR /app

# 3. Copy only package files first (for caching dependencies)
COPY package.json package-lock.json* ./

# 4. Install dependencies
RUN npm install

# Pass build-time env
# Set build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL

# Expose the build arguments as environment variables for the build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# 5. Copy the rest of your app code
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Serve the app using a lightweight container
FROM node:22-slim AS runner

RUN apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /app

# Only copy the production build
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Only install runtime deps
COPY package-lock.json ./
RUN npm ci --omit=dev

# Expose the port Next.js will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
