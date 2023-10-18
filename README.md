# Gestion des Amis "cp7-gestion-amis"
Ce projet met en œuvre un système de gestion d'amis avec des fonctionnalités telles que l'enregistrement d'utilisateur, la connexion, l'ajout d'amis, la gestion des demandes d'amis et la visualisation de la liste d'amis.

## Fonctionnalités

- Enregistrement utilisateur
- Connexion utilisateur
- Page d'accueil (redirige vers la page de connexion si l'utilisateur n'est pas connecté)
- Ajouter d'autres utilisateurs en amis
- Voir les demandes en cours émises par l'utilisateur
- Voir les demandes émises par d'autres utilisateurs (accepter ou refuser)
- Voir la liste d'amis

## Technologies utilisées

- Node.js
- Express.js
- MySQL
- Bcrypt
- EJS (pour les vues)
- Cookie-parser
- Nodemon

## Configuration

1. Assurez-vous d'avoir Node.js et MySQL installés localement.
2. Clonez le projet depuis GitHub.
3. Installez les dépendances avec `npm install`.
4. Importer le fichier bdd.sql dans votre base de données

## Exécution du Projet

1. Exécutez `npm start` pour démarrer le serveur.
2. Accédez à `http://localhost:3000` dans votre navigateur.

## Testez
Pour pouvoir tester le projet, vous possédez deux utilisateurs :

1er utilisateur
Email : james@example.re
Mot de passe : 0000

2éme utilisateur
Email : john.doe@example.com
Mot de passe : 123456

3éme utilisateur
Email : alice.smith@example.com
Mot de passe : abcdef

4éme utilisateur
Email : bob.johnson@example.com
Mot de passe : password123

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.