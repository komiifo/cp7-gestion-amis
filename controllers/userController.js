const bcrypt = require('bcrypt');
const db = require('../db');

// Fonction pour gérer l'enregistrement d'un utilisateur
async function registerUser(req, res) {
    const { nom, prenom, email, password } = req.body;

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enregistrement dans la base de données
    const sql = 'INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, prenom, email, hashedPassword], (err, result) => {
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
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification des informations de connexion :', err);
            res.sendStatus(500);
        } else {
            if (results.length > 0) {
                const user = results[0];

                // Comparaison du mot de passe haché
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // Création du cookie avec l'ID de l'utilisateur
                    const userID = user.idUser;
                    res.cookie('userID', userID);

                    console.log('Utilisateur connecté avec succès');
                    res.redirect('/?message=success');
                } else {
                    console.log('Informations de connexion incorrectes');
                    res.redirect('login/?message=error');
                }
            } else {
                console.log('Utilisateur non trouvé');
                res.redirect('login/?message=error');
            }
        }
    });
}

// Fonction pour afficher une liste d'autres utilisateurs
function getUsers(req, res) {
    // Récupérer la liste d'autres utilisateurs depuis la base de données - il me manque que ça pour qu'il ne prend pas son propre compte et les comptes deja amis ou en attends, etc
    const sql = 'SELECT * FROM users WHERE idUser <> ?';
    db.query(sql, [req.cookies.userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            res.sendStatus(500);
        } else {
            res.render('users', { users: results });
        }
    });
}

// Fonction pour afficher le profil d'un utilisateur
function profileUser(req, res) {
    const userID = req.cookies.userID;

    // Récupérer les informations de l'utilisateur depuis la base de données
    const sql = 'SELECT * FROM users WHERE idUser = ?';
    db.query(sql, [userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur :', err);
            res.sendStatus(500);
        } else {
            const user = results[0];

            // Affichez la page de profil avec les informations de l'utilisateur
            res.render('profile', { user });
        }
    });
}



// Fonction pour envoyer une demande d'ami
function sendFriendRequest(req, res) {
    const userID = req.params.userID;

    // Insérer la demande d'ami dans la base de données
    const sql = 'INSERT INTO demandes_amis (idUserEmetteur, idUserRecepteur, DateDemande) VALUES (?, ?, NOW())';
    db.query(sql, [req.cookies.userID, userID], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'envoi de la demande d\'ami :', err);
            res.sendStatus(500);
        } else {
            res.redirect('/users');
        }
    });
}


// Fonction pour afficher les demandes d'amis en cours
function getMyFriendRequests(req, res) {
    // Récupérer les demandes en cours depuis la base de données
    const sql = `
    SELECT * FROM demandes_amis da
    INNER JOIN users u
    ON da.idUserRecepteur = u.idUser 
    WHERE idUserEmetteur = ?`;
    db.query(sql, [req.cookies.userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des demandes en cours :', err);
            res.sendStatus(500);
        } else {
            res.render('my-friend-requests', { friendRequests: results });
        }
    });
}


// Fonction pour annuler une demande d'ami
function cancelFriendRequest(req, res) {
    const requestID = req.params.requestID;

    // Supprimer la demande d'ami de la base de données
    const sql = 'DELETE FROM demandes_amis WHERE idDemande = ?';
    db.query(sql, [requestID], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'annulation de la demande d\'ami :', err);
            res.sendStatus(500);
        } else {
            res.redirect('/my-friend-requests');
        }
    });
}


// Fonction pour afficher les demandes d'amis reçues
function getFriendRequestsReceived(req, res) {
    // Récupérer les demandes reçues depuis la base de données
    const sql = 'SELECT * FROM demandes_amis WHERE idUserRecepteur = ? AND etat = "En Attente"';
    db.query(sql, [req.cookies.userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des demandes reçues :', err);
            res.sendStatus(500);
        } else {
            res.render('friend-requests-received', { friendRequestsReceived: results });
        }
    });
}

// Fonction pour accepter une demande d'ami
function acceptFriendRequest(req, res) {
    const requestID = req.params.requestID;
    const userID = req.cookies.userID;

    // Mettre à jour l'état de la demande d'ami dans la base de données
    const sql = 'UPDATE demandes_amis SET etat = ? WHERE idDemande = ?';
    db.query(sql, ['Acceptee', requestID], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'acceptation de la demande d\'ami :', err);
            res.sendStatus(500);
        } else {
            const sqlAccept = 'INSERT INTO amis (idUser1, idUser2, date) VALUES (?, ?, NOW())';
            db.query(sqlAccept, [userID, requestID], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'enregistrement dans la base de données :', err);
                    res.sendStatus(500);
                } else {
                    res.redirect('/my-friends');
                }
            })

        }
    });
}

// Fonction pour refuser une demande d'ami
function rejectFriendRequest(req, res) {
    const requestID = req.params.requestID;

    // Mettre à jour l'état de la demande d'ami dans la base de données
    const sql = 'UPDATE demandes_amis SET Etat = ? WHERE idDemande = ?';
    db.query(sql, ['Refusee', requestID], (err, result) => {
        if (err) {
            console.error('Erreur lors du refus de la demande d\'ami :', err);
            res.sendStatus(500);
        } else {
            res.redirect('/friend-requests-received');
        }
    });
}

// Fonction pour afficher la liste d'amis sans inclure l'utilisateur actuel
function getMyFriends(req, res) {
    const userID = req.cookies.userID;

    // Récupérer la liste d'amis depuis la base de données
    const sql = `
        SELECT users.idUser, users.nom, users.prenom
        FROM users
        INNER JOIN amis ON (users.idUser = amis.idUser1 OR users.idUser = amis.idUser2)
        WHERE (amis.idUser1 = ? OR amis.idUser2 = ?) AND users.idUser <> ?
    `;

    db.query(sql, [userID, userID, userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des amis :', err);
            res.sendStatus(500);
        } else {
            res.render('my-friends', { friends: results });
        }
    });
}



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    profileUser,
    sendFriendRequest,
    getMyFriendRequests,
    cancelFriendRequest,
    getFriendRequestsReceived,
    acceptFriendRequest,
    rejectFriendRequest,
    getMyFriends
};
