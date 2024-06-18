# FROM node:lts as dependencies
# WORKDIR /co-assemble-ui
# COPY package.json package-lock.json ./
# RUN npm install --frozen-lockfile


# FROM node:lts as builder
# WORKDIR /co-assemble-ui
# COPY . .
# COPY --from=dependencies /co-assemble-ui/node_modules ./node_modules
# RUN npm run build


# FROM node:lts as runner
# WORKDIR /co-assemble-ui
# ENV NODE_ENV production

# COPY --from=builder /co-assemble-ui/public ./public
# COPY --from=builder /co-assemble-ui/package.json ./package.json
# COPY --from=builder /co-assemble-ui/.next ./.next
# COPY --from=builder /co-assemble-ui/node_modules ./node_modules

# COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 3000
# CMD ["npm", "run" , "start"]

# Stage 1: Dependencies
FROM node:lts as dependencies
WORKDIR /co-assemble-ui
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Stage 2: Build
FROM node:lts as builder
WORKDIR /co-assemble-ui
COPY . .
COPY --from=dependencies /co-assemble-ui/node_modules ./node_modules
RUN npm run build

# Stage 3: Runner
FROM nginx:alpine as runner
COPY --from=builder /co-assemble-ui/.next /usr/share/nginx/html/.next
COPY --from=builder /co-assemble-ui/public /usr/share/nginx/html/public
COPY --from=builder /co-assemble-ui/package.json /usr/share/nginx/html/package.json
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
