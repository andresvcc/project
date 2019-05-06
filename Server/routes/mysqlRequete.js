/********************************************************
    Mysql Json Query List
*********************************************************
    Andres Vicente Caballero Cantillo
    Alex erne
    Projet Transversal I
    Group 5 - Système de recommendation	de produits
**********************************************************/

module.exports = Object.freeze({   
 
/*0*/ NEW_SESSION_SERVER:`INSERT INTO s_server () VALUES();`,    
    
/*1*/ LIST_SESSIONS_SERVER: `Select * FROM s_server`,  

/*2*/ CURRENT_SESSION_SERVER: `SELECT * 
                               FROM s_server 
                               WHERE id_session = (SELECT MAX( id_session )as id FROM s_server);`, 

/*3*/ LIST_USERS: `SELECT * FROM users`,

/*4*/ LIST_ACHETEURS: `SELECT * 
                       FROM users, acheteurs
                       WHERE users.id_user = acheteurs.id_user`,

/*5*/ LIST_VENDEURS: `SELECT * 
                      FROM users, vendeurs
                      WHERE users.id_user = vendeurs.id_user`,

/*6*/ LIST_RECOMMANDATION: `SELECT * FROM recommandations`,

/*7*/ LIST_RESTAURANTS: `SELECT * FROM restaurants`,

/*8*/ LIST_CATEGORIES: `SELECT id_categorie as id, nom as name FROM categories`,

/*9*/ LIST_PRODUITS:`SELECT  produits.id_produit,
                         produits.nom, 
                         restaurants.nom as restaurants, 
                         categories.nom as categorie, 
                         produits.prix_base, 
                         produits.description, 
                         bio, 
                         produits.photoName as photoPlat, 
                         restaurants.photoName as photoResto 
                     FROM restaurants, categories, produits
                     WHERE produits.id_restaurant = restaurants.id_restaurant
                     AND produits.id_categorie = categories.id_categorie;`,

/*10*/ NEW_USER: (surname, password, email) => { 
            return `INSERT IGNORE INTO users
                         SET surname = '${surname}',
                         password = '${password}',
                         email = "${email}";`
     },

/*11*/ NEW_ACHETEUR: (surname, password, quartier) => { 
            return `INSERT INTO acheteurs (id_user, quartier)
                    VALUES(
                        (SELECT id_user FROM users WHERE surname = '${surname}' AND password = '${password}'),
                        ${quartier});`
     },

/*12*/ NEW_VENDEUR: (surname, password, nom, prenom, adresse, bancaire) => {
           return `INSERT INTO vendeurs (id_user, nom, prenom, adresse, bancaire)
                   VALUES(
                       (SELECT id_user FROM users WHERE surname = '${surname}' AND password = '${password}'),
                       "${nom}",
                       "${prenom}",
                       "${adresse}",
                       "${bancaire}"
                   );`
     },

/*13*/ FIND_SIMPLE_USER:(surname)=>{
          return `SELECT surname FROM users WHERE surname = '${surname}'`
     },

/*13.2*/ FIND_USER: (surname, password) => {
          return `SELECT surname, 1 as typeuser
                    FROM users, vendeurs 
                    WHERE users.surname = '${surname}'
                    AND users.id_user = vendeurs.id_user
                    AND users.password = '${password}'
               UNION
               SELECT surname, 2 as typeuser
                    FROM users, acheteurs 
                    WHERE users.surname = '${surname}'
                    AND users.id_user = acheteurs.id_user
                    AND users.password = '${password}'`
    },

/*14*/ NEW_SESSION: `INSERT INTO s_server () VALUES();`,

/*15*/ USER_ACTION: (surname, action, value) => { 
     return    `INSERT INTO log (id_user, id_session, action, value)
                SELECT (SELECT id_user FROM users WHERE surname = '${surname}'),
                       (SELECT MAX( id_session ) FROM s_server ),
                       "${action}",
                       "${value}"` 
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
            return `SELECT  produits.id_produit,
                            produits.nom, 
                            restaurants.nom as restaurants, 
                            categories.nom as categorie,
                            produits.id_categorie, 
                            produits.prix_base, 
                            produits.description, 
                            bio, 
                            produits.photoName, 
                            restaurants.photoName as photoResto 
                    FROM restaurants, categories, produits
                    WHERE produits.id_restaurant = restaurants.id_restaurant
                    AND produits.id_categorie = categories.id_categorie
                    AND restaurants.nom = "${restaurant}";` 
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
            return `INSERT INTO restaurants (id_user, nom, description, adresse, telephone, quartier, photoName)
                    VALUES (
                         (
                              SELECT vendeurs.id_user 
                              FROM vendeurs, users 
                              WHERE users.surname = '${surname}' 
                              AND users.password = '${password}'
                              AND vendeurs.id_user = users.id_user
                         ), 
                         "${nom}",
                         "${description}",
                         "${adresse}",
                         "${telephone}",
                         ${quartier},
                         "${photoName} "   
                    );` 
     },
        
/*36*/ NEW_CATEGORIE: (nom, description) => { 
            return `INSERT INTO categories (nom, description) 
                values ('${nom}','${description}');` 
     },

/*37*/ NEW_PRODUIT: (surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) => { 
            return `INSERT INTO produits (id_restaurant, id_categorie, nom, prix_base, description, photoName, bio)
                    VALUES (
                              (
                                   SELECT id_restaurant 
                                   FROM restaurants, vendeurs, users 
                                   WHERE users.id_user = vendeurs.id_user
                                   AND restaurants.id_user = users.id_user
                                   AND users.surname = '${surname}'
                                   AND users.password ='${password}'
                                   AND restaurants.nom = "${restaurant}"
                              ),
                              ${categorie},
                              "${nom}",
                              ${prixBase},
                              "${description}",
                             "${photoName}",
                              ${bio}
                         );` 
     },

/*38*/ EDIT_RESTAURANT: (restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) => { 
            return `query` 
     },

/*39*/ EDIT_PRODUIT: (produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) => { 
            return `query` 
     },

/*40*/ DEL_RESTAURANT: (surname, password, nom) => { 
            return `DELETE FROM restaurants 
            WHERE restaurants.nom = "${nom}"
            AND restaurants.id_user =  (SELECT users.id_user 
                                        FROM users 
                                        WHERE users.surname = '${surname}'
                                        AND users.password = '${password}')` 
     },

/*41*/ DEL_PRODUIT: (surname, password, nom, restaurant) => { 
            return `DELETE FROM produits 
                    WHERE produits.id_produit IN (
                         SELECT * 
                         FROM (SELECT produits.id_produit
                              FROM produits, restaurants, vendeurs, users
                              WHERE produits.id_restaurant = restaurants.id_restaurant
                              AND produits.nom = '${nom}'
                              AND restaurants.nom = "${restaurant}"
                              AND vendeurs.id_user = restaurants.id_user
                              AND vendeurs.id_user = users.id_user
                              AND users.surname = '${surname}'
                              AND users.password = '${password}'
                              ) AS id_produit
                         )`  
     },

/*42*/ LIST_PRODUIT_VENDEUR: (surname, password) => { 
            return `query` 
     },

/*43*/ LIST_RESTAURANT_VENDEUR: (surname, password) => { 
            return `SELECT restaurants.nom, restaurants.description, restaurants.adresse, restaurants.telephone, restaurants.quartier, restaurants.photoName 
                    FROM restaurants, vendeurs, users
                    WHERE restaurants.id_user = vendeurs.id_user
                    AND vendeurs.id_user = users.id_user
                    AND users.surname = '${surname}' AND users.password = '${password}'` 
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

