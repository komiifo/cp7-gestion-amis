const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');

const app = express();

// Configuration de la vue EJS
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Middleware pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Middleware pour vérifier l'authentification
const isAuthenticated = (req, res, next) => {
    if (req.cookies.userID) {
        // L'utilisateur est connecté
        next();
    } else {
        console.log(req.cookies);
        // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
        res.redirect('/login');
    }
};


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
    const message = req.query.message;

    res.render('login', { message });
});

// Login - POST
app.post('/login', userController.loginUser);

// Liste des utilisateurs - GET
app.get('/users', isAuthenticated, userController.getUsers);

// Utilisation du middleware dans une route protégée
app.get('/profile', isAuthenticated, userController.profileUser);


// Envoyer une demande d'ami - GET
app.get('/send-friend-request/:userID', isAuthenticated, userController.sendFriendRequest);

// Demandes d'amis en cours - GET
app.get('/my-friend-requests', isAuthenticated, userController.getMyFriendRequests);

// Annuler une demande d'ami - GET
app.get('/cancel-friend-request/:requestID', isAuthenticated, userController.cancelFriendRequest);

// Demandes d'amis reçues - GET
app.get('/friend-requests-received', isAuthenticated, userController.getFriendRequestsReceived);

// Accepter une demande d'ami - GET
app.get('/accept-friend-request/:requestID', isAuthenticated, userController.acceptFriendRequest);

// Refuser une demande d'ami - GET
app.get('/reject-friend-request/:requestID', isAuthenticated, userController.rejectFriendRequest);

// Liste des amis - GET
app.get('/my-friends', isAuthenticated, userController.getMyFriends);


// Démarrage de l'app sur le port 3000
app.listen(3000, (req, res) => {
    console.log('L\'app fonctionne sur le port 3000');
});