FROM node:lts as dependencies
WORKDIR /coassemble-ui
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /coassemble-ui
COPY . .
COPY --from=dependencies /coassemble-ui/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /coassemble-ui
ENV NODE_ENV production

COPY --from=builder /coassemble-ui/public ./public
COPY --from=builder /coassemble-ui/package.json ./package.json
COPY --from=builder /coassemble-ui/.next ./.next
COPY --from=builder /coassemble-ui/node_modules ./node_modules

COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["npm", "run" , "start"]