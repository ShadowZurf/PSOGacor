# Gunakan image ringan
FROM node:18-alpine

# Set workdir
WORKDIR /app

# Salin hanya file untuk install dependencies
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Salin semua sisa file project
COPY . .

# Build Next.js
RUN npm run build

# Jalankan di port 3000
EXPOSE 3000
CMD ["npm", "start"]
