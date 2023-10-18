const express = require('express');
const ejs = require('ejs');
const path = require('path');
const userController = require('./controllers/userController');

const app = express();

// Configuration de la vue EJS
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Middleware pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));

// Accueil - GET
app.get('/', (req, res) => {
    // Récupérer le paramètre de message si OK
    const message = req.query.message; 
    
    res.render('home', { message });
});

// Register - GET
app.get('/register', (req, res) => {
    res.render('register');
});

// Register - POST
app.post('/register', userController.registerUser);

// Login - GET
app.get('/login', (req, res) => {
    res.render('login');
});

// Login - POST
app.post('/login', userController.loginUser);
// Démarrage de l'app sur le port 3000
app.listen(3000, (req, res) => {
    console.log('L\'app fonctionne sur le port 3000');
});