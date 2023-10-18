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
    idDemande INT AUTO_INCREMENT PRIMARY KEY,
    idUserEmetteur INT NOT NULL,
    idUserRecepteur INT NOT NULL,
    etat ENUM('En Attente', 'Acceptée', 'Refusée') DEFAULT 'En Attente',
    dateDemande DATETIME NOT NULL,
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

-- Les insert
INSERT INTO `users` (`idUser`, `nom`, `prenom`, `email`, `password`) VALUES
(1, 'Jackson', 'James', 'james@example.re', '$2a$10$RPCqviHpoqlyOFdSpnssHu4QKGnQz8LpDLFa5te7vfToc8kyd3ka.'),
(2, 'Doe', 'John', 'john.doe@example.com', '$2a$10$oJAIK2MDpkfDg2wkTM3rEO5c0lC6K2px7FISSLXy5EhT7.4q/6Twq\n'),
(3, 'Smith', 'Alice', 'alice.smith@example.com', '$2a$10$JE/N/Cvy/UllSNfTN/EGRu1ERVCrMjDASdM/0SXsgLDAxQ8ulIkI2'),
(4, 'Johnson', 'Bob', 'bob.johnson@example.com', '$2a$10$yQKoTYmS8cAPyrf0woqj6OZE6jyDrqUmH8VrbWGBsn.Zr5CJulFLa');

INSERT INTO `amis` (`idAmi`, `idUser1`, `idUser2`, `date`) VALUES
(1, 2, 1, '2023-10-18 13:51:52');

INSERT INTO `demandes_amis` (`idDemande`, `idUserEmetteur`, `idUserRecepteur`, `etat`, `dateDemande`) VALUES
(1, 1, 2, 'Acceptée', '2023-10-18 12:55:00'),
(3, 2, 3, 'En Attente', '2023-10-18 13:58:53');