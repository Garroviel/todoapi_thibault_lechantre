## optimisation


taille non opti : 1.58GB

taille opti : 187MB

ajout dans le dockerignore

dans le dockerfile : 

FROM node:18-alpine AS dependencies


RUN npm ci --only=production

ENV NODE_ENV=production

COPY src ./src