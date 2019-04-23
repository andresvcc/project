/*
show databbases; Voir toutes les bases de données dans le system
use A1 : Selectionner la base de donnée
show tables; // voir les tables
drop table (nom table) // enlever une table
drop database (nom database) //enlever une BDD
*/

/**Initialiser la base de donnée*/
use A1;
DROP DATABASE A1;
CREATE DATABASE A1;
use A1;
show tables;


DROP TABLE IF EXISTS users;
CREATE TABLE users (
   id_user INT(255) AUTO_INCREMENT NOT NULL,
   surname VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   email VARCHAR(255),
   CONSTRAINT pk_users PRIMARY KEY(id_user)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
   id_session INT(255) AUTO_INCREMENT NOT NULL,
   time_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT pk_sesions PRIMARY KEY (id_session)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS log;
CREATE TABLE log (
   id_user INT(255) NOT NULL,
   id_session INT(255) NOT NULL,
   action VARCHAR(255) NOT NULL,
   value VARCHAR(255),
   time_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT pk_log PRIMARY KEY(id_user,id_session,time_date),
   CONSTRAINT registre FOREIGN KEY(id_session)
        REFERENCES sessions(id_session) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT login FOREIGN KEY(id_user)
        REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS acheteurs;
CREATE TABLE acheteurs (
   id_user INT(255) NOT NULL,
   quartier INT(255) default 0,
   npa INT(255),
   CONSTRAINT pk_acheteur PRIMARY KEY(id_user),
   CONSTRAINT est_acheteur FOREIGN KEY(id_user)
      REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS achats;
CREATE TABLE achats (
   id_achat INT(255) AUTO_INCREMENT NOT NULL,
   id_user INT(255) NOT NULL,
   payment boolean not null default 0,
   nom_card INT(255),
   num_card INT(255),
   date_achat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT pk_achats PRIMARY KEY(id_achat),
   CONSTRAINT fk3_acheteurs FOREIGN KEY(id_user)
      REFERENCES acheteurs(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS vendeurs;
CREATE TABLE vendeurs (
   id_user INT(255) NOT NULL,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255) NOT NULL,
   adresse VARCHAR(255),
   npa INT(255),
   bancaire VARCHAR(255),
   CONSTRAINT pk_vendeurs PRIMARY KEY(id_user),
   CONSTRAINT est_vendeur FOREIGN KEY(id_user)
    REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;


DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants (
   id_restaurant INT(255) AUTO_INCREMENT NOT NULL,
   id_user INT(255) NOT NULL,
   nom VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   telephone INT(255),
   quartier INT(255),
   photoName VARCHAR(255),
   CONSTRAINT pk_restaurants PRIMARY KEY(id_restaurant),
   CONSTRAINT appartient FOREIGN KEY(id_user)
      REFERENCES vendeurs(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
   id_categorie INT(255) AUTO_INCREMENT NOT NULL,
   nom VARCHAR(255) UNIQUE NOT NULL,
   description VARCHAR(255),
   CONSTRAINT pk_categories PRIMARY KEY(id_categorie)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS plats;
CREATE TABLE plats (
   id_plat INT(255) AUTO_INCREMENT NOT NULL,
   id_restaurant INT(255) NOT NULL,
   id_categorie INT(255) NOT NULL,
   nom VARCHAR(255) NOT NULL,
   prix_base INT(255) DEFAULT 0,
   description VARCHAR(255),
   photoName VARCHAR(255),
   bio boolean not null default 0,
   CONSTRAINT pk_plats PRIMARY KEY(id_plat),
   CONSTRAINT propose FOREIGN KEY(id_restaurant)
      REFERENCES restaurants(id_restaurant) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT conserne1 FOREIGN KEY(id_categorie)
      REFERENCES categories(id_categorie) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

DROP TABLE IF EXISTS plats_achete;
CREATE TABLE plats_achete (
   id_achat INT(255) NOT NULL,
   id_plat INT(255) NOT NULL,
   prix_final INT(255) NOT NULL,
   quantite INT(255) DEFAULT 1,
   evaluation INT(8) DEFAULT 1,
   CONSTRAINT pk_plats_achete PRIMARY KEY(id_achat,id_plat),
   CONSTRAINT rattache FOREIGN KEY(id_achat) 
      REFERENCES achats(id_achat) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT define FOREIGN KEY(id_plat)
      REFERENCES plats(id_plat) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS recommandations;
CREATE TABLE recommandations (
   id_user INT(255) NOT NULL,
   id_plat INT(255) NOT NULL,
   date_recommendation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT pk_recommendations PRIMARY KEY(id_user,id_plat),
   CONSTRAINT conserne2 FOREIGN KEY(id_plat)
      REFERENCES plats(id_plat) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT recoit FOREIGN KEY(id_user)
      REFERENCES acheteurs(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS produits_panier;
CREATE TABLE produits_panier (
   id_user INT(255) NOT NULL,
   id_plat INT(255) NOT NULL,
   info VARCHAR(255),
   CONSTRAINT pk_produits_panier PRIMARY KEY(id_user, id_plat),
   CONSTRAINT contient FOREIGN KEY(id_plat)
      REFERENCES plats(id_plat) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT dispose FOREIGN KEY(id_user)
      REFERENCES acheteurs(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;