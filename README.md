## Description

Une API Node.js simple qui simule un jeu de pêche. Les utilisateurs peuvent créer une canne à pêche, ajouter un lieu de pêche, ajouter des poissons au lieu de pêche et capturer des poissons avec une probabilité de réussite basée sur leur équipement, et monter de niveau.

## Fonctionnalités

1. Gestion des utilisateurs

Créer un utilisateur → [POST] /auth/register
Champs requis :

- username (unique)

- email (unique)

- password : minimum 12 caractères, incluant une majuscule, un caractère spécial, et un chiffre

Connexion → [POST] /auth/login

Déconnexion → [GET] /auth/logout

Modification de profil → [PUT] /users

Suppression de compte → [DELETE] /users

2. Gestion des lieux de pêche

Créer un lieu → [POST] /places
Champs requis :

- name (unique)

Modifier un lieu → [PUT] /places/:id

Supprimer un lieu → [DELETE] /places/:id

Récupérer ses lieux → [GET] /places

3. Gestion des cannes à pêche

Créer une canne → [POST] /fishingRods
Champs requis :

- name

Modifier une canne → [PUT] /fishingRods/:id

Supprimer une canne → [DELETE] /fishingRods/:id

Récupérer une canne → [GET] /fishingRods

Récupérer toutes les cannes → [GET] /fishingRods/all

4. Gestion des poissons

Créer un poisson aléatoire → [POST] /fishes
Champs requis :

- name (unique)

- placeId (UUID d’un lieu existant)

- Le level est généré aléatoirement entre 1 et 100

Modifier un poisson → [PUT] /fishes/:id

Supprimer un poisson → [DELETE] /fishes/:id

Récupérer tous les poissons → [GET] /fishes

Récupérer un poisson spécifique → [GET] /fishes/:id

5. Capture de poissons

Tenter de capturer un poisson → [POST] /fishes/:id/catch

Le joueur doit être le créateur du lieu où se trouve le poisson

Le joueur doit posséder une canne à pêche

La probabilité de réussite est basée sur la formule :
catchRate (canne) − level (poisson)

Ex. : un poisson de niveau 40 et une canne à 65% de catchRate donne 25% de chances de réussite

a. En cas de succès :

Le poisson est supprimé
Le joueur gagne +1 niveau

b. En cas d’échec :

Aucun changement

!!
L'utilisateur doit avoir créé un lieu, une canne à pèche et au moins un poisson avant de pouvoir commencer à pécher.

## Relations entre entités

Un utilisateur possède une seule canne à pêche (fishingRod)
Un utilisateur peut créer plusieurs lieux de pêche (places)
Chaque lieu peut contenir plusieurs poissons (fishes)
Un poisson appartient à un lieu, et seul le créateur de ce lieu peut le capturer

## Variables d'environnement nécessaires:

Avant de lancer l'application, assure-toi de définir les variables d'environnement suivantes dans un fichier .env à la racine du projet :

| `PORT` | Port sur lequel le serveur Express sera lancé (ex: `3000`).

| `NODE_ENV` | Environnement d'exécution (`development`, `production`, `test`).

| `ORIGIN` | URL d'origine autorisée pour les requêtes CORS (ex: `http://localhost:5173`).

| `JWT_SECRET` | Clé secrète utilisée pour signer les tokens JWT (doit être longue et complexe).

| `DATABASE_URL` | URL de connexion à la base de données PostgreSQL (ex: `postgres://user:password@host:port/database`). |

## Modèle de données (Drizzle ORM)

1. Utilisateur (users)
   id, email, username, password, level, createdAt, updatedAt

2. Canne à pêche (fishing_rods)
   id, name, createdById, catchRate

3. Lieu de pêche (places)
   id, name, createdById

4. Poisson (fishes)
   id, name, level, userId, placeId, createdAt, updatedAt

## Commandes NPM

| `npm run generate` | Génère automatiquement les fichiers de migration à partir des schémas définis dans Drizzle ORM. C'est la commande à lancer après avoir modifié les fichiers de schéma (`.schema.ts`).

| `npm run migrate` | Applique les migrations à la base de données. Elle exécute tous les fichiers de migration générés pour mettre à jour la structure des tables.

| `npm run dev` | Démarre le serveur en mode développement avec `ts-node-dev`. Il recharge automatiquement l'application à chaque modification de fichier.
