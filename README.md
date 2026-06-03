## Structure du projet ##
todo-api/
├── src/
│   ├── routes/
│   │   └── tasks.js
│   ├── models/
│   │   └── task.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── data/
│   │   └── tasks.json
│   ├── app.js
│   └── index.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── package.json
└── README.md

## Fonctionnalités ##

Gestion des tâches
Création d'une tâche
Consultation de toutes les tâches
Consultation d'une tâche par identifiant
Modification d'une tâche
Suppression d'une tâche
Health Check

Permet de vérifier que l'API fonctionne correctement.

GET /health

## Modèle de données ##

{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "todo",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

## Configuration

Copier le fichier .env.example :

cp .env.example .env

Puis adapter les valeurs si nécessaire.

## Lancement du projet ##

Prérequis :

Docker
Docker Compose
Construction et démarrage
docker compose up --build

L'API sera accessible sur :

http://localhost:3001

## Endpoints API ##

Vérification :

GET /health

Créer une tâche :

POST /api/tasks

Exemple :

{
  "title": "README",
  "description": "Rédiger la documentation",
  "status": "todo"
}

## Lister toutes les tâches ##

GET /api/tasks

## Consulter une tâche ##

GET /api/tasks/{id}

## Modifier une tâche ##

PUT /api/tasks/{id}

## Supprimer une tâche ##

DELETE /api/tasks/{id}

## Persistance des données ##

Les tâches sont stockées dans un fichier JSON :

src/data/tasks.json

Le dossier est monté dans Docker via un volume afin de conserver les données même après redémarrage du conteneur.


API disponible sur http://localhost:3001

Routes :
GET    /health
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id


## Exercice debugger dockerfile ##

dans Docs/Docker-debug.md les soluces

dans docker-debug/ les dockerfile