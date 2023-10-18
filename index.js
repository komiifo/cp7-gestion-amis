const express = require('express');

const app = express();

// Configuration de la vue EJS
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.json());

// Middleware pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));

// Accueil - GET
app.get('/', (req, res) => {
    res.render('home');
});

// Démarrage du serveur sur le port 3000
app.listen(3000, (req, res) => {
    console.log('Serveur à l\'écoute sur le port 3000');
});