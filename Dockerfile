# Gunakan image ringan
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# WAJIB pakai port 8080
EXPOSE 8080

# Jalankan Next.js di port 8080
ENV PORT=8080
CMD ["npx", "next", "start", "-p", "8080"]
