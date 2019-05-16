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

/*8*/ LIST_CATEGORIES: `SELECT id_categorie as id, nom as name FROM categories ORDER BY id`,

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
     return    `INSERT INTO log (id_user, action, value)
                SELECT (SELECT id_user FROM users WHERE surname = '${surname}'),
                       "${action}",
                       "${value}"` 
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

/*23*/ RECOMMANDATION: (nom) => { 
            return `SELECT produits.nom, produits.description, produits.photoName, restaurants.nom as restaurants, COUNT(1) AS quantite
                    FROM produits_achete, produits, restaurants
                    WHERE id_achat IN (
                              SELECT achats.id_achat
                              FROM achats, produits_achete, produits
                              WHERE achats.id_achat = produits_achete.id_achat
                              AND produits.id_produit = produits_achete.id_produit
                              AND produits.nom = '${nom}'
                         )
                    AND produits.id_restaurant = restaurants.id_restaurant
                    AND produits.id_produit = produits_achete.id_produit
                    AND produits.nom <> '${nom}'
                    GROUP BY produits.nom, produits.description, produits.photoName, restaurants.nom
                    HAVING COUNT(1) > 1
                    ORDER BY quantite DESC LIMIT 1` 
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
     
/*29.04*/ PANIER_QUANTITE_PRODUIT:(produit, restaurant)=>{
     return   `SELECT quantite 
               FROM produits_panier 
               WHERE produits_panier.id_produit = (
                    SELECT produits.id_produit
                         FROM produits
                         WHERE produits.nom = '${produit}'
                         AND produits.id_restaurant = (
                              SELECT restaurants.id_restaurant
                              FROM restaurants
                              WHERE restaurants.nom = '${restaurant}'
                         )
                    )`
},

/*29.02*/ PANIER_LIST:(surname, password)=>{
     return   `SELECT *, restaurants.photoName as photoResto, restaurants.description as descriResto, (produits.prix_base * produits_panier.quantite) as prixTotal, restaurants.nom as restaurant
               FROM produits_panier, restaurants, produits 
               WHERE produits_panier.id_user = (
                         SELECT acheteurs.id_user 
                         FROM acheteurs, users 
                         WHERE users.surname = '${surname}' 
                         AND users.password = '${password}'
                         AND acheteurs.id_user = users.id_user
                    )
               AND produits_panier.id_produit = produits.id_produit
               AND produits.id_restaurant = restaurants.id_restaurant `
     },

/*29.021*/ PANIER_TOTAL:(surname, password)=>{
     return   `SELECT SUM(prixTotal) 
               FROM (
               SELECT (produits.prix_base * produits_panier.quantite) as prixTotal
                              FROM produits_panier, restaurants, produits 
                              WHERE produits_panier.id_user = (
                                        SELECT acheteurs.id_user 
                                        FROM acheteurs, users 
                                        WHERE users.surname = 'an' 
                                        AND users.password = 'a'
                                        AND acheteurs.id_user = users.id_user
                                   )
                              AND produits_panier.id_produit = produits.id_produit
                              AND produits.id_restaurant = restaurants.id_restaurant 
               )as res_table`
},

/*29.01*/ FIND_IN_PANIER:(surname, password, produit, restaurant)=>{
     return   `SELECT id_produit 
               FROM produits_panier 
               WHERE produits_panier.id_produit = (
                    SELECT produits.id_produit
                         FROM produits
                         WHERE produits.nom = '${produit}'
                         AND produits.id_restaurant = (
                              SELECT restaurants.id_restaurant
                              FROM restaurants
                              WHERE restaurants.nom = '${restaurant}'
                         )
                    )
               AND  produits_panier.id_user = (
                         SELECT acheteurs.id_user 
                         FROM acheteurs, users 
                         WHERE users.surname = '${surname}' 
                         AND users.password = '${password}'
                         AND acheteurs.id_user = users.id_user
                    )`
     },

/*29*/ ADD_PRODUIT_PANIER: (surname, password, produit, restaurant, info, quantite) => { 
            return `INSERT INTO produits_panier (id_user, id_produit, info, quantite)
                    VALUES (
                         (
                              SELECT acheteurs.id_user 
                              FROM acheteurs, users 
                              WHERE users.surname = '${surname}' 
                              AND users.password = '${password}'
                              AND acheteurs.id_user = users.id_user
                         ),
                         (
                              SELECT produits.id_produit
                              FROM produits
                              WHERE produits.nom = '${produit}'
                              AND produits.id_restaurant = (
                                   SELECT restaurants.id_restaurant
                                   FROM restaurants
                                   WHERE restaurants.nom = '${restaurant}'
                              )
                         ),
                         '${info}',
                         ${quantite}
                    );` 
     },

/*30*/ DEL_PRODUIT_PANIER: (surname, password, produit, restaurant) => { 
            return `DELETE FROM produits_panier 
                    WHERE produits_panier.id_produit = (
                              SELECT produits.id_produit
                              FROM produits
                              WHERE produits.nom = '${produit}'
                              AND produits.id_restaurant = (
                                   SELECT restaurants.id_restaurant
                                   FROM restaurants
                                   WHERE restaurants.nom = '${restaurant}'
                              )
                         )
                    AND produits_panier.id_user =  (SELECT users.id_user 
                                                  FROM users 
                                                  WHERE users.surname = '${surname}'
                                                  AND users.password = '${password}');` 
     },

/*30.1*/ DEL_PANIER:(surname, password)=>{
            return `DELETE FROM produits_panier 
                    WHERE produits_panier.id_user =  (SELECT users.id_user 
                                                  FROM users 
                                                  WHERE users.surname = '${surname}'
                                                  AND users.password = '${password}')`
     },

/*31*/ UPDATE_PANIER_QUANTITE:(surname, password, produit, restaurant, quantite )=>{
            return `UPDATE produits_panier
                    SET quantite = ${quantite}
                    WHERE produits_panier.id_user = (
                              SELECT acheteurs.id_user 
                              FROM acheteurs, users 
                              WHERE users.surname = '${surname}' 
                              AND users.password = '${password}'
                              AND acheteurs.id_user = users.id_user
                         )
                    AND produits_panier.id_produit = (
                         SELECT produits.id_produit
                         FROM produits
                         WHERE produits.nom = '${produit}'
                         AND produits.id_restaurant = (
                              SELECT restaurants.id_restaurant
                              FROM restaurants
                              WHERE restaurants.nom = '${restaurant}'
                         )
                    );`
     },

/*33.1*/ NEW_ACHATS:(surname, password)=>{
            return `INSERT INTO achats (id_user, payment, total)
                    VALUES (
                              (
                                   SELECT acheteurs.id_user 
                                   FROM acheteurs, users 
                                   WHERE users.surname = '${surname}' 
                                   AND users.password = '${password}'
                                   AND acheteurs.id_user = users.id_user
                              ),
                              0,
                              (
                                   SELECT SUM(prixTotal) 
                                   FROM (
                                   SELECT (produits.prix_base * produits_panier.quantite) as prixTotal
                                                  FROM produits_panier, restaurants, produits 
                                                  WHERE produits_panier.id_user = (
                                                            SELECT acheteurs.id_user 
                                                            FROM acheteurs, users 
                                                            WHERE users.surname = 'an' 
                                                            AND users.password = 'a'
                                                            AND acheteurs.id_user = users.id_user
                                                       )
                                                  AND produits_panier.id_produit = produits.id_produit
                                                  AND produits.id_restaurant = restaurants.id_restaurant 
                                   )as res_table
                              )
                         );`
     },

/*33.2*/ ADD_PRODUIT_ACHAT:(surname, password, idProduit, prixFinal, quantite)=>{
            return `INSERT INTO produits_achete (id_achat, id_produit, prix_final, quantite, evaluation)
                    VALUES (
                         (
                              SELECT MAX(achats.id_achat) as id 
                              FROM achats, users
                              WHERE users.surname = '${surname}' 
                              AND users.password = '${password}'
                              AND users.id_user = achats.id_user
                         ),
                         ${idProduit},
                         ${prixFinal},
                         ${quantite},
                         1
                    );` 
},

PRODUITS_ACHATS_LIST: (surname, password, idAchat) => { 
       return `SELECT produits.*, restaurants.nom as restaurant, prix_final as prixTotal, produits_achete.quantite as quantite
               FROM produits_achete, achats, users, produits, restaurants
               WHERE achats.id_achat = produits_achete.id_achat
               AND produits_achete.id_produit = produits.id_produit
               AND restaurants.id_restaurant =  produits.id_restaurant
               AND achats.id_achat = ${idAchat}
               AND achats.id_user = users.id_user
               AND users.surname = '${surname}'
               AND users.password = '${password}';` 
},


/*33*/ ACHATS_LIST: (surname, password) => { 
            return `SELECT achats.id_achat, achats.payment, date_achat, total 
                    FROM achats, users
                    Where achats.id_user = users.id_user
                    and users.surname = '${surname}'
                    and users.password = '${password}'` 
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
                         "${photoName}"   
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

