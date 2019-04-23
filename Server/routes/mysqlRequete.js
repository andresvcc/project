/********************************************************
    Mysql Json Query List
*********************************************************
    Andres Vicente Caballero Cantillo
    Alex erne
    Projet Transversal I
    Group 5 - Système de recommendation	de produits
**********************************************************/

module.exports = Object.freeze({   
    
/*1*/ LIST_SESSIONS: `Select * FROM sessions`,  

/*2*/ CURRENT_SESSION: `SELECT MAX( id_session ) FROM sessions`, 

/*3*/ LIST_USERS: `SELECT * FROM users`,

/*4*/ LIST_ACHETEURS: `SELECT * 
                       FROM users, acheteurs
                       WHERE users.id_user = acheteurs.id_user`,

/*5*/ LIST_VENDEURS: `SELECT * 
                      FROM users, vendeurs
                      WHERE users.id_user = vendeurs.id_user`,

/*6*/ LIST_RECOMMANDATION: `SELECT * FROM recommandations`,

/*7*/ LIST_RESTAURANTS: `SELECT * FROM restaurants`,

/*8*/ LIST_CATEGORIES: `SELECT * FROM categories`,

/*9*/ LIST_PLATS: `SELECT * FROM plats`,

/*10*/ NEW_USER: (surname, password, email) => { 
            return `INSERT INTO users (surname, password, email)
                    SELECT *
                    FROM (SELECT '${surname}', '${password}', '${email}') AS tmp
                    WHERE NOT EXISTS (SELECT surname FROM users WHERE surname = '${surname}')
                    LIMIT 1;`
     },

/*11*/ NEW_ACHETEUR: (surname, password, quartier, npa) => { 
            return `INSERT INTO acheteurs (id_user, quartier, npa)
                    VALUES(
                        (SELECT id_user FROM users WHERE surname = '${surname}' AND password = '${password}'),
                        ${quartier},
                        ${npa});'`
     },

/*12*/ NEW_VENDEUR: (surname, password, nom, prénom, adresse, quartier, npa, bancaire, comptePay) => {
            return `INSERT INTO vendeurs (id_user, comptepay, adresse)
                    VALUES(
                        (SELECT id_user FROM users WHERE surname = '${surname}' AND password = '${password}'),
                        '${comptePay}',
                        '${adresse}'
                    );'`
     },

/*13*/ FIND_USER: (surname, password) => {
        return `SELECT surname 
                FROM users 
                WHERE surname = '${surname}' 
                AND password = '${password}';`
    },

/*14*/ NEW_SESSION: `INSERT INTO sessions () VALUES();`,

/*15*/ USER_ACTION: (surname, action, value) => { 
     return    `INSERT INTO log (id_user, id_session, action, value)
                SELECT  (SELECT id_user FROM users WHERE surname = '${surname}'),
                    (SELECT MAX( id_session ) FROM sessions ),
                    '${action}',
                    '${value}'` 
     },

/*16*/ CHANGE_PASSWORD: (surname, password, newPassword) => { 
            return `query` 
     },

/*17*/ CLOSE_ACCOUNT: (surname, password) => { 
            return `query` 
     },

/*18*/ FIND_PRODUIT_NOM: (nomProduit, username, password) => { 
            return `query`
     },

/*19*/ LIST_PRODUIT_CATEGORIE: (categorie) => { 
            return `query` 
     },

/*20*/ LIST_PRODUIT_RESTAURANT: (restaurant) => { 
            return `query` 
     },

/*21*/ FIND_PRODUIT_QUARTIER: (nomProduit, username, password) => { 
            return `query` 
     },

/*22*/ CATEGORIE_ACHETEUR: (surname, password) => { 
            return `query` 
     },

/*23*/ RECOMMANDATION: (surname) => { 
            return `query` 
     },

/*24*/ TOP5_PRODUIT_CATEGORIE: (categorie) => { 
            return `query` 
     },

/*25*/ TOP_PRODUIT_RESTAURANT: (restaurant) => { 
            return `query` 
     },

/*26*/ RESTAURANT_QUARTIER: (quartier) => { 
            return `query` 
     },

/*27*/ TOP5_PRODUITS_PLUS_ACHETE: (quartier) => { 
            return `query` 
     },

/*28*/ TOP_RESTAURANT_EVAL_LIS: (quartier) => { 
            return `query` 
     },

/*29*/ ADD_PRODUIT_PANIER: (surname, password, produit, quantite) => { 
            return `query` 
     },

/*30*/ DEL_PRODUIT_PANIER: (surname, password, produit) => { 
            return `query` 
     },

/*31*/ EDIT_PRODUIT_PANIER: (surname, password, produit, quantite) => { 
            return `query` 
     },

/*32*/ PAYER_PRODUIT: (surname, password, produit) => { 
            return `query` 
     },

/*33*/ ACHATS_LIST: (surname, password) => { 
            return `query` 
     },

/*34*/ EVALUER_PRODUIT: (surname, password, produit) => { 
            return `query` 
     },

/*35*/ NEW_RESTAURANT: (surname, password, nom, description, photoName, adresse, quartier, telephone) => { 
            return `query` 
     },
        
/*36*/ NEW_CATEGORIE: (surname, password, nom, description) => { 
            return `INSERT INTO categories (nom, description) 
                values ('${nom}','${description}');` 
     },

/*37*/ NEW_PRODUIT: (surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) => { 
            return `query` 
     },

/*38*/ EDIT_RESTAURANT: (restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) => { 
            return `query` 
     },

/*39*/ EDIT_PRODUIT: (produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) => { 
            return `query` 
     },

/*40*/ DEL_RESTAURANT: (restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) => { 
            return `query` 
     },

/*41*/ DEL_PRODUIT: (produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) => { 
            return `query` 
     },

/*42*/ LIST_PRODUIT_VENDEUR: (surname, password) => { 
            return `query` 
     },

/*43*/ LIST_RESTAURANT_VENDEUR: (surname, password) => { 
            return `query` 
     },

/*44*/ EVALUATION_VENDEUR: (surname, password) => { 
            return `query` 
     },

/*45*/ EVAL_RESTAURANT: (surname, password, restaurant) => { 
            return `query` 
     },

/*46*/ LIST_VENTES: (surname, password) => { 
            return `query` 
     },

/*47*/ LIST_VENTES_RESTAURANT: (surname, password, restaurant) => { 
            return `query` 
     }
});

