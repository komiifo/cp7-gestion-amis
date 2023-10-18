CREATE DATABASE IF NOT EXISTS cp7_gestion_ami;

use cp7_gestion_ami;

-- Table des users
CREATE TABLE IF NOT EXISTS users (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(155) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table des demandes d'amis
CREATE TABLE IF NOT EXISTS demandes_amis (
    ID_Demande INT AUTO_INCREMENT PRIMARY KEY,
    idUserEmetteur INT NOT NULL,
    idUserRecepteur INT NOT NULL,
    Etat ENUM('En Attente', 'Acceptée', 'Refusée') DEFAULT 'En Attente',
    DateDemande DATETIME NOT NULL,
    FOREIGN KEY (idUserEmetteur) REFERENCES users(idUser),
    FOREIGN KEY (idUserRecepteur) REFERENCES users(idUser)
);

-- Table des amis
CREATE TABLE IF NOT EXISTS amis (
    idAmi INT AUTO_INCREMENT PRIMARY KEY,
    idUser1 INT NOT NULL,
    idUser2 INT NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (idUser1) REFERENCES users(idUser),
    FOREIGN KEY (idUser2) REFERENCES users(idUser)
);