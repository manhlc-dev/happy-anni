# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Cài dependencies
RUN npm install

# Copy source code
COPY . .

# Build Next.js
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Chỉ copy những thứ cần để chạy
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js* ./

# Expose port
EXPOSE 80

# Start Next.js
CMD ["npm", "run", "start"]
