FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . ./
ENV PORT 3000
ENV VITE_APISERVER=https://pcb01.parikshaworld.com
EXPOSE $PORT
RUN npm run build
CMD ["node","build/index.js"]

