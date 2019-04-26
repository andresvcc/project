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
INSERT INTO acheteurs (id_user, quartier, npa)
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
INSERT INTO vendeurs (id_user, nom, prenom, adresse, npa, bancaire)
values (
    (SELECT id_user FROM users WHERE surname = 'pikachu' and password = 'password'), 
    'andres',
    'caballero',
    'avenue du lignon',
    1219,
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
    'burger KING',
    'description',
    13139070,
    0,
    'sdlfkn.img'    
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
nouvelle categorie
*/
INSERT INTO categories (nom, description)
values ('burger','texte');

/*******************************************************
liste des categories
*/
SELECT * FROM categories;

/*******************************************************
nouvelle produits
*/
INSERT INTO plats (id_restaurant, id_categorie, nom, prix_base, description, photoName, bio)
values 
(
    (
        SELECT id_restaurant FROM restaurants, vendeurs, users 
        WHERE users.id_user = vendeurs.id_user
        AND restaurants.id_user = users.id_user
        AND users.surname = 'pikachu'
        AND users.password ='password'
        AND restaurants.nom = 'burger KING'
    ),
    (
        SELECT id_categorie FROM categories WHERE nom = 'burger'
    ),
    'burger chesse',
    19,
    'est une burber avec fromage',
    'aydjhvfskj.img',
    true
);

SELECT * FROM plats;
/*******************************************************
liste des produits 
*/
/*plats.nom,*/

SELECT  plats.nom as plats, 
        restaurants.nom as restaurant, 
        categories.nom as categorie, 
        plats.prix_base, 
        plats.description as descriptions, 
        bio, 
        plats.photoName as photoPlat, 
        restaurants.photoName as photoResto 
FROM restaurants, categories, plats
WHERE plats.id_restaurant = restaurants.id_restaurant
AND plats.id_categorie = categories.id_categorie;

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
