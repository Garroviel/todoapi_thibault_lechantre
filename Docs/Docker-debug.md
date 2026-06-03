## Dockerfile 1

Au build de l'image il y a un warning :

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 7)

syntaxe de CMD npm start devrait être CMD ["npm", "start"]

## Dockerfile 2

Il fait : 

COPY . .
RUN npm install

idéalement il faudrait :

RUN npm install
COPY ..

## Dockerfile 3

il fait : 

FROM node:18

ce qui est l'image complète

correction :

FROM node:18-alpine