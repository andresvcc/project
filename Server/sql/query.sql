/*******************************************************
Ce sont les enquêtes sur la base de données réalisées 
pour le cours "Projet transversal".
*******************************************************/

/*******************************************************
 Andres Vicente Caballero Cantillo et  Alexis Erne
*******************************************************/

/*******************************************************
DEMARRER NOUVELLEL SESION DANS LE SERVEUR
chaque fois que le serveur se met en route, il est 
nécessaire de créer une nouvelle session d'utilisation 
sur le serveur*/
use a1;
INSERT INTO s_server ()
VALUES();

/*******************************************************/
/*voir la liste des s_server*/
SELECT * FROM s_server;

/*find user */
SELECT surname 
                FROM users 
                WHERE surname = 'pikachu' 
                AND password = 'password'

/*liste des users*/
SELECT * FROM users;

/*chercher un user (true si truvé)*/
SELECT surname 
FROM users
WHERE surname = 'pikachug'

/******************************************************
NOUVEAU ACHETEUR
est composé des trois requetés une premier pour l'ajoute 
dans la table user et une deuxième pour l'ajouter dans 
la table acheteur afin de créer le lien d'héritage et en 
dernier on doit generer un log */
/*  1   */
INSERT INTO users (surname, password, email)
SELECT * FROM (SELECT 'surnom', 'password', 'email') AS tmp
WHERE NOT EXISTS (
    SELECT surname FROM users WHERE surname = 'surnom'
) LIMIT 1;

INSERT IGNORE INTO users
SET surname = 'newuser',
password = '123456',
email = '12678';
/*  2   */
INSERT INTO acheteurs (id_user, quartier)
values (
    (SELECT id_user FROM users WHERE surname = 'surnom' and password = 'password'), 
    1,
    1219  
);
/*  3   */
INSERT INTO log (id_user, id_session, action)
SELECT  (SELECT id_user FROM users WHERE surname = 'surnom'),
        (SELECT MAX( id_session ) FROM s_server ),
        'CREATION'
/*******************************************************/
/*liste des acheteurs*/
SELECT * 
FROM users, acheteurs
WHERE users.id_user = acheteurs.id_user;

/*******************************************************
NOUVEAU VENDEURS
est composé des trois requetés une premier pour l'ajoute
dans la table use et une deuxième pour l'ajouter dans 
la table acheteur afin de créer le lien d'héritage et en 
dernier on doit generer un log */
/*  1   */
INSERT INTO users (surname, password, email)
SELECT * FROM (SELECT 'pikachu', 'password', 'email') AS tmp
WHERE NOT EXISTS (
    SELECT surname FROM users WHERE surname = 'pikachu'
) LIMIT 1;
/*  2   */
INSERT INTO vendeurs (id_user, nom, prenom, adresse, bancaire)
values (
    (SELECT id_user FROM users WHERE surname = 'pikachu' and password = 'password'), 
    'andres',
    'caballero',
    'avenue du lignon',
    '123456'  
);
/*  3   */
INSERT INTO log (id_user, id_session, action)
SELECT  (SELECT id_user FROM users WHERE surname = 'pikachu'),
        (SELECT MAX( id_session ) FROM s_server ),
        'CREATION'
/*******************************************************/
/*liste des vendeurs*/
SELECT * 
FROM users, vendeurs
WHERE users.id_user = vendeurs.id_user;

/*******************************************************
SE CONNECTER
nous générons un log (journal)avec cette demande */
INSERT INTO log (id_user, id_session, action, value)
SELECT  (SELECT id_user FROM users WHERE surname = 'pikachu'),
        (SELECT MAX( id_session ) FROM s_server ),
        'LOGIN',
        'value'
/*******************************************************/
/*liste des utilisateurs connectés*/
SELECT * FROM log;

/*chercher un user et identifier son type (acheteur/vendeur)*/
SELECT surname, 1 as typeuser
    FROM users, vendeurs 
    WHERE users.surname = 'andres'
    AND users.id_user = vendeurs.id_user
    AND users.password = '1234'
UNION
SELECT surname, 2 as typeuser
    FROM users, acheteurs 
    WHERE users.surname = 'andres'
    AND users.id_user = acheteurs.id_user
    AND users.password = '1234';

/*liste des utilisateurs connectés la dernier sesion du serveur*/
SELECT * 
FROM log 
WHERE id_session = ( SELECT MAX(id_session) FROM s_server) 
AND action = 'LOGIN';

/*liste des utilisateurs qui se sont connectés dans une sesion donné*/
SELECT * 
FROM log 
WHERE id_session = 1 and /* 1 represente la sesion choisi dans la recherche*/
    action = 'LOGIN';

/*******************************************************
SE DECONNECTER
pour se deconnecter nous générons un log (journal) */
INSERT INTO log (id_user, id_session, action)
SELECT  (SELECT id_user FROM users WHERE surname = 'pikachu'),
        (SELECT MAX( id_session ) FROM s_server ),
        'LOGOUT';

/*******************************************************/


/*liste des s_server*/
SELECT * FROM s_server;

/*voir le journal des action (log)*/
SELECT users.id_user, users.surname, log.action, log.value, log.id_session, log.time_date
FROM log, users 
WHERE log.id_user = users.id_user
ORDER BY log.id_session, log.time_date;

/*******************************************************
NOUVEAU RESTAURANT
*/
INSERT INTO restaurants (id_user, nom, description, telephone, quartier, photoName)
values (
    (
        SELECT vendeurs.id_user 
        FROM vendeurs, users 
        WHERE users.surname = 'pikachu' 
        AND users.password = 'password'
        AND vendeurs.id_user = users.id_user
    ), 
    'el chorizo',
    'description',
    13139070,
    0,
    'http://localhost:4000/Photo/1556438776950-1334.jpeg'    
);

/*******************************************************
list des restaurant
*/
SELECT  id_restaurant, 
        restaurants.nom as restaurant, 
        CONCAT(vendeurs.prenom, ' ' ,
        vendeurs.nom) as propieter,
        users.surname
FROM vendeurs,users,restaurants
WHERE users.id_user = vendeurs.id_user 
AND vendeurs.id_user = restaurants.id_user;

/*******************************************************
liste des restaurant d'un vendeur
*/
SELECT * 
FROM restaurants, vendeurs, users
WHERE restaurants.id_user = vendeurs.id_user
AND vendeurs.id_user = users.id_user
AND users.surname = 'jeisy'


/*******************************************************
nouvelle categorie
*/
INSERT INTO categories (nom, description)
values ('pain','texte');

/*******************************************************
liste des categories
*/
SELECT * FROM categories;

/*******************************************************
nouvelle produits
*/
INSERT INTO produits (id_restaurant, id_categorie, nom, prix_base, description, photoName, bio)
values 
(
    (
        SELECT id_restaurant 
        FROM restaurants, vendeurs, users 
        WHERE users.id_user = vendeurs.id_user
        AND restaurants.id_user = users.id_user
        AND users.surname = 'andres'
        AND users.password ='pass'
        AND restaurants.nom = 'yuka'
    ),
    1,
    'burger chesse sete',
    19,
    'est une burber avec fromage descripcion',
    'null.jpg',
    true
);

select * from produits

SELECT produits.id_produit, produits.nom, produits.description, produits.prix_base, produits.bio, produits.photoName, restaurants.nom as resto
FROM produits, restaurants
WHERE produits.id_restaurant = restaurants.id_restaurant
AND restaurants.nom = 'yuka'
/*******************************************************
liste des produits 
*/
SELECT  produits.id_produit,
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
AND produits.id_categorie = categories.id_categorie
AND restaurants.nom = 'chorizo';

/*effacer produit*/
DELETE FROM produits 
WHERE produits.id_produit IN (SELECT * 
                              FROM (SELECT produits.id_produit
                                    FROM produits, restaurants, vendeurs, users
                                    WHERE produits.id_restaurant = restaurants.id_restaurant
                                    AND produits.nom = 'burger chesse cuatro'
                                    AND restaurants.nom = 'yuka'
                                    AND vendeurs.id_user = restaurants.id_user
                                    AND vendeurs.id_user = users.id_user
                                    AND users.surname = 'andres'
                                   ) AS id_produit
                             )

DELETE FROM produits 
WHERE produits.id_produit = 3


/*effacer acheteur*/
DELETE FROM acheteurs 
WHERE acheteur.id_user = (SELECT id_user FROM users WHERE surname = 'yuka')

DELETE FROM users 
WHERE surname = 'yuka'


SELECT * 
FROM s_server 
WHERE id_session = (SELECT MAX( id_session )as id FROM s_server);

/*liste des users avec le typeUser(acheteur 2/vender 1)*/
SELECT users.id_user, users.surname, users.email, 2 as typeUser 
FROM users, acheteurs
WHERE users.id_user = acheteurs.id_user
UNION
SELECT users.id_user, users.surname, users.email, 1 as typeUser 
FROM users, vendeurs
WHERE users.id_user = vendeurs.id_user;




SELECT surname, 1 as typeuser
    FROM users, vendeurs 
    WHERE users.surname = 'andres'
    AND users.id_user = vendeurs.id_user
    AND users.password = '1234'
UNION
SELECT surname, 2 as typeuser
    FROM users, acheteurs 
    WHERE users.surname = 'andres'
    AND users.id_user = acheteurs.id_user
    AND users.password = '1234';


SELECT * 
FROM produits_panier, restaurants, produits 
WHERE produits_panier.id_user = (
                    SELECT acheteurs.id_user 
                    FROM acheteurs, users 
                    WHERE users.surname = 'jeisy' 
                    AND users.password = 'pass'
                    AND acheteurs.id_user = users.id_user
                )
AND produits_panier.id_produit = produits.id_produit
AND produits.id_restaurant = restaurants.id_restaurant 


SELECT id_produit 
FROM produits_panier 
WHERE produits_panier.id_produit = (
                             SELECT produits.id_produit
                             FROM produits
                             WHERE produits.nom = 'menu Burger'
                             AND produits.id_restaurant = (
                                 SELECT restaurants.id_restaurant
                                 FROM restaurants
                                 WHERE restaurants.nom = 'kfc'
                             )
                         )


INSERT INTO produits_panier (id_user, id_produit, info, quantite)
                    VALUES (
                        (
                            SELECT acheteurs.id_user 
                            FROM acheteurs, users 
                            WHERE users.surname = 'luz' 
                            AND users.password = 'pass'
                            AND acheteurs.id_user = users.id_user
                         ),
                         (
                             SELECT produits.id_produit
                             FROM produits
                             WHERE produits.nom = 'pollo'
                             AND produits.id_restaurant = (
                                 SELECT restaurants.id_restaurant
                                 FROM restaurants
                                 WHERE restaurants.nom = 'kfc'
                             )
                         ),
                         'information',
                         1
                    );


UPDATE produits_panier
                    SET quantite = 3
                    WHERE produits_panier.id_user = (
                              SELECT acheteurs.id_user 
                              FROM acheteurs, users 
                              WHERE users.surname = 'jeisy' 
                              AND users.password = 'pass'
                              AND acheteurs.id_user = users.id_user
                         )
                    AND produits_panier.id_produit = (
                         SELECT produits.id_produit
                         FROM produits
                         WHERE produits.nom = 'choco'
                         AND produits.id_restaurant = (
                              SELECT restaurants.id_restaurant
                              FROM restaurants
                              WHERE restaurants.nom = 'kfc'
                         )
                    );


/*consulter le panier d'un utilisateur*/
SELECT * 
FROM produits_panier, restaurants, produits 
WHERE produits_panier.id_user = (
                    SELECT acheteurs.id_user 
                    FROM acheteurs, users 
                    WHERE users.surname = 'jeisy' 
                    AND users.password = 'pass'
                    AND acheteurs.id_user = users.id_user
                )
AND produits_panier.id_produit = produits.id_produit
AND produits.id_restaurant = restaurants.id_restaurant 

/* effacer le panier d'un tuilisateur*/
DELETE FROM produits_panier 
WHERE produits_panier.id_user =  (SELECT users.id_user 
                                FROM users 
                                WHERE users.surname = 'jeisy'
                                AND users.password = 'pass');



select * from achats

/* creer une achat*/
INSERT INTO achats (id_user, payment, nom_card, num_card )
VALUES (
    (
        SELECT acheteurs.id_user 
        FROM acheteurs, users 
        WHERE users.surname = 'luz' 
        AND users.password = 'pass'
        AND acheteurs.id_user = users.id_user
        ),
        0,
        1,
        1
);

/*ajouter des produits dans une achat*/
INSERT INTO produits_achete (id_achat, id_produit, prix_final, quantite, evaluation)
VALUES (
    (
        SELECT MAX(achats.id_achat) as id 
        FROM achats, users
        WHERE users.surname = 'luz' 
        AND users.password = 'pass'
        AND users.id_user = achats.id_user
    ),
    3,
    1,
    3,
    10
);




SELECT achats.id_achat, id_produit, prix_final as total, quantite, payment, evaluation
FROM produits_achete, achats, users
Where achats.id_achat = produits_achete.id_achat
and achats.id_user = users.id_user
and users.surname = 'jeisy'
and users.password = 'pass'


