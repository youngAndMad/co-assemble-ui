FROM node:lts as dependencies
WORKDIR /co-assemble-ui
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile


FROM node:lts as builder
WORKDIR /co-assemble-ui
COPY . .
COPY --from=dependencies /co-assemble-ui/node_modules ./node_modules
RUN npm run build


FROM node:lts as runner
WORKDIR /co-assemble-ui
ENV NODE_ENV production

COPY --from=builder /co-assemble-ui/public ./public
COPY --from=builder /co-assemble-ui/package.json ./package.json
COPY --from=builder /co-assemble-ui/.next ./.next
COPY --from=builder /co-assemble-ui/node_modules ./node_modules

COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["npm", "run" , "start"]