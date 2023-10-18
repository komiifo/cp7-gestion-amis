const db = require('../db');

// Fonction pour gérer l'enregistrement d'un utilisateur
function registerUser(req, res) {
    const { nom, prenom, email, password } = req.body;

    // Enregistrement dans la base de données
    const sql = 'INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, prenom, email, password], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement dans la base de données :', err);
            res.sendStatus(500); // Code d'erreur interne du serveur
        } else {
            console.log('Utilisateur enregistré avec succès');
            res.redirect('/'); // Redirection vers la page d'accueil après l'enregistrement
        }
    });
}

// Fonction pour gérer l'enregistrement d'un utilisateur
function loginUser(req, res) {
    const { email, password } = req.body;

    // Vérification dans la base de données
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification des informations de connexion :', err);
            res.sendStatus(500);
        } else {
            if (results.length > 0) {
                console.log('Utilisateur connecté avec succès');
                res.redirect('/?message=success');
            } else {
                console.log('Informations de connexion incorrectes');
                res.render('login', { error: 'Informations de connexion incorrectes' });
            }
        }
    });
}

module.exports = {
    registerUser,
    loginUser,
};
