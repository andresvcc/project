/******************************************************** 
    Mysql Router
*********************************************************
    Andres Vicente Caballero Cantillo
    Alex erne
    Projet Transversal I
    Group 5 - Système de recommendation	de produits
**********************************************************/

const mysql = require('mysql');
var constants = require('./mysqlRequete');

/*------------------------------------------------
 |           MySQL CONFIG CONNECTION             |
 ------------------------------------------------*/
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "A1"
});

connection.connect((err)=>{ 
    err ? console.log(`problème de connection`): console.log(`Connected`);
});

/*-------------------------------------------------
|                    ROUTER                       |
-------------------------------------------------*/
const routerMysql = (app)=>{

    logout = (resultat, req) => {
        
        let status = resultat == '' ? (
            console.log(`-/${resultat}/-`),
            { ok: false}
        ) : (  
                userAction(req.session.surname, 'LOGOUT', ''),
                req.session.destroy(),
                { ok: true}
            )
    
        return status
    }

    userAction = (surname, action, value) =>{
        let sqlQuery = constants.USER_ACTION(surname, action, value)
        connection.query(sqlQuery, (err, resultat) => {
            err ? console.log(err) : console.log(action)
        }) 
    }

    sessionName = (req) => req.session.surname ? req.session.surname : ''
    sessionPass = (req) => req.session.password ? req.session.surname : '' 

    /*---------------------
    |        SI           |
    ---------------------*/
        
    /* fn 1	 iste des session du serveur
        LIST_SESSIONS */
    app.post('/listSessions', (req, res) => {
        let sqlQuery = constants.LIST_SESSIONS
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 2	 a session curent
        CURRENT_SESSION */
    app.post('/currentSession', (req, res) => {
        let sqlQuery = constants.CURRENT_SESSION 
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 3	 iste des utilisateurs
        LIST_USERS */
    app.post('/listUsers', (req, res) => {
        let sqlQuery = constants.LIST_USERS
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 4	 iste des acheteurs
        LIST_ACHETEURS */
    app.post('/listAcheteurs', (req, res) => {
        let sqlQuery = constants.LIST_ACHETEURS
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 5	 iste des vendeurs
        LIST_VENDEURS */
    app.post('/listVendeurs', (req, res) => {
        let sqlQuery = constants.LIST_VENDEURS
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 6	 iste des recommandations
        LIST_RECOMMANDATION */
    app.post('/listUserOn', (req, res) => {
        let sqlQuery = constants.LIST_RECOMMANDATION
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 7	 iste des restaurants
        LIST_RESTAURANTS */
    app.post('/listRestaurants', (req, res) => {
        let sqlQuery = constants.LIST_RESTAURANTS
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, resultat })
        })
    })

    /* fn 8	 iste des catégories
        LIST_CATEGORIES */
    app.post('/listCategories', (req, res) => {
        let sqlQuery = constants.LIST_CATEGORIES
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, reponse: resultat })
        })
    })

    /* fn 9	 iste des plats
        LIST_PLATS */
    app.post('/listPlats', (req, res) => {
        let sqlQuery = constants.LIST_PLATS
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /*---------------------
    |       USER         |
    ---------------------*/

    /* fn 10 add un nouveau user
        NEW_USER(surname, password, email) */
    app.post('/newUser', (req, res) => {
        let sqlQuery = constants.NEW_USER(req.body.surname, req.body.password, req.body.email)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    });

    /* fn 11 add un nouveau acheteur
        NEW_ACHETEUR(surname, password, quartier, npa) */
    app.post('/newAcheteur', (req, res) => {
        let sqlQueryAcheteur = constants.NEW_ACHETEUR(req.body.surname, req.body.password, req.body.quartier, req.body.npa)
        let sqlQueryUser = constants.NEW_USER(req.body.surname, req.body.password, req.body.email)

        connection.query(sqlQueryUser, (err, resultat1) => {
            err ? res.json({ ok: false, error: err }) : (
                connection.query(sqlQueryAcheteur, (err, resultat2) => {
                    err ? res.json({ ok: false, error: err }) : (
                        err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: { n1: resultat1, n2: resultat2 } })
                    )
                }) 
            )
        })
    })

    /* fn 12 add un nouveau vendeur
        NEW_VENDEUR(surname, password, nom, prénom, adresse, quartier, npa, bancaire, comptePay, adresse) */
    app.post('/newVendeur', (req, res) => {
        let sqlQuery = constants.NEW_VENDEUR(req.body.surname, req.body.password, req.body.nom, req.body.prénom, 
                                             req.body.adresse, req.body.quartier, req.body.npa, req.body.bancaire, 
                                             req.body.comptePay, req.body.adresse)

        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    //function pour aider fn 13 LOGIN
    login = (resultat,req)=>{
        let status = resultat == '' ? (
            {ok:false, resultat:'user ou mot de passe incorrecte'}
        ):(
            req.session.surname = resultat[0].surname,
            req.session.password = req.body.password,
            req.session.typeuser = resultat[0].typeuser,
            userAction(req.session.surname, 'LOGIN', req.body.password), //(surname, action, value)
            { ok: true, surname: req.session.surname, typeUser:  req.session.typeuser}
        )
        return status 
    }

    /* fn 13 demande de login
        LOGIN(surname, password) */
    app.post('/userLogin', (req, res)=> {
        let surname = req.body.surname ? req.body.surname : ''
        let password = req.body.password ? req.body.password : ''
        let sqlQuery = constants.FIND_USER(surname, password)
        console.log(sqlQuery)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) :
                res.json(login(resultat, req))
        })
    });

    /* fn 14 demande de logout
        LOGOUT(surname, password) */
    app.post('/logout', (req, res) => {
        let surname = req.session.surname ? req.session.surname : ''
        let password = req.session.password ? req.session.password : ''
        //res.json({n:surname, p:password})
        console.log('/'+surname+' '+password)
        let sqlQuery = constants.FIND_USER(surname, password)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) :
                res.json(logout(resultat, req))
        })
    })

    /* fn 15 fournir action de session
        USER_ACTION(surname, password, action) */
    app.post('/userAction', (req, res) => {
        userAction(sessionName(req), req.body.action, req.body.value)
        res.json({ok:'ok'})
        
    })

    /* fn 16 changer password
        CHANGE_PASSWORD(surname, password, newPassword) */
    app.post('/changePassword', (req, res) => {
        let sqlQuery = constants.CHANGE_PASSWORD(sessionName(req), sessionPass(req), req.body.newPassword)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 17 fermer une compte
        CLOSE_ACCOUNT(surname, password) */
    app.post('/closeAccount', (req, res) => {
        let sqlQuery = constants.CLOSE_ACCOUNT(sessionName(req), sessionPass(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /*---------------------
    |      ACHETEUR      |
    ---------------------*/

    /* fn 18 chercher un Produit par nom
        FIND_PRODUIT_NOM(nomProduit, surname) */
    app.post('/findProduitNom', (req, res) => {
        let sqlQuery = constants.FIND_PRODUIT_NOM(req.body.nomProduit, sessionName(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 19 liste de produit dans une catégorie
        LIST_PRODUIT_CATEGORIE(categorie) */
    app.post('/listProduitCategorie', (req, res) => {
        let sqlQuery = constants.LIST_PRODUIT_CATEGORIE(req.body.categorie) 
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })
    
    /* fn 20 liste de Produit dans un restaurant
        LIST_PRODUIT_RESTAURANT(restaurant) */
    app.post('/listProduitRestaurant', (req, res) => {
        let sqlQuery = constants.LIST_PRODUIT_RESTAURANT(req.body.restaurant)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 21 chercher un Produit dans mon quartier
        FIND_PRODUIT_QUARTIER(nomProduit, surname) */
    app.post('/findProduit', (req, res) => {
        let sqlQuery = constants.FIND_PRODUIT_QUARTIER(req.body.nomProduit, sessionName(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 22 dernières categorie acheté
        CATEGORIE_ACHETEUR(surname) */
    app.post('/categorieAcheteur', (req, res) => {
        let sqlQuery = constants.CATEGORIE_ACHETEUR(sessionName(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 23 liste de produits recommande
        RECOMMANDATION(surname) */
    app.post('/recommandation', (req, res) => {
        let sqlQuery = constants.RECOMMANDATION(sessionName(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 24 liste des 5 meilleures produits d'une categorie [évaluation/prix]
        TOP5_PRODUIT_CATEGORIE(categorie) */
    app.post('/top5ProduitCategorie', (req, res) => {
        let sqlQuery = constants.TOP5_PRODUIT_CATEGORIE(req.body.categorie)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 25 le meilleur produits d'un restaurant [évaluation/prix]
        TOP_PRODUIT_RESTAURANT(restaurant) */
    app.post('/topProduitRestaurant', (req, res) => {
        let sqlQuery = constants.TOP_PRODUIT_RESTAURANT(req.body.restaurant)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 26 liste des restaurant dans un quartier
        RESTAURANT_QUARTIER(quartier) */
    app.post('/restaurantQuartier', (req, res) => {
        let sqlQuery = constants.RESTAURANT_QUARTIER(req.body.quartier)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 27 liste des 5 produits plus acheté dans un quartier
        TOP5_PRODUITS_PLUS_ACHETE(quartier) */
    app.post('/top5ProduitsPlusAchete', (req, res) => {
        let sqlQuery = constants.TOP5_PRODUITS_PLUS_ACHETE(req.body.quartier)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 28 meilleurs restaurant dans un quartier [moyenne évaluation produits]
        TOP_RESTAURANT_EVAL_LIS(quartier) */
    app.post('/topRestaurantEvalList', (req, res) => {
        let sqlQuery = constants.TOP_RESTAURANT_EVAL_LIS(req.body.quartier)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /*---------------------
    |       VENDEUR       |
    ---------------------*/

    /* fn 29 ajouter un produits au panier
        ADD_PRODUIT_PANIER(surname, password, produit, quantite) */
    app.post('/addProduitPanier', (req, res) => {
        let sqlQuery = constants.ADD_PRODUIT_PANIER(sessionName(req), sessionPass(req), req.body.produit, req.body.quantite)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 30 effacer un produits du panier
        DEL_PRODUIT_PANIER(surname, password, produit) */
    app.post('/delProduitPanier', (req, res) => {
        let sqlQuery = constants.DEL_PRODUIT_PANIER(sessionName(req), sessionPass(req), req.body.produit)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 31 éditer un produits du panier
        EDIT_PRODUIT_PANIER(surname, password, produit, quantite) */
    app.post('/editProduitPanier', (req, res) => {
        let sqlQuery = constants.EDIT_PRODUIT_PANIER(sessionName(req), sessionPass(req), req.body.produit, req.body.quantite)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })
    
    /* fn 32 payer un produits
        PAYER_PRODUIT(surname, password, produit) */
    app.post('/payerProduit', (req, res) => {
        let sqlQuery = constants.PAYER_PRODUIT(sessionName(req), sessionPass(req), req.body.produit)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 33 liste des achat déjà effectues
        ACHATS_LIST(surname, password) */
    app.post('/achatList', (req, res) => {
        let sqlQuery = constants.ACHATS_LIST(sessionName(req), sessionPass(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 34 évaluer un produits acheté
        EVALUER_PRODUIT(surname, password, produit) */
    app.post('/evaluerProduit', (req, res) => {
        let sqlQuery = constants.EVALUER_PRODUIT(sessionName(req), sessionPass(req), req.body.produit)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 35 créer une restaurant
        NEW_RESTAURANT(surname, password, nom, description, photoName, adresse, quartier, telephone) */
    app.post('/newRestaurant', (req, res) => {
        let sqlQuery = constants.NEW_RESTAURANT(sessionName(req), sessionPass(req), req.body.nom, 
                                                req.body.description, req.body.photoName, req.body.adresse, 
                                                req.body.quartier, req.body.telephone)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 36 ajouter une catégorie
        NEW_CATEGORIE(surname, password, nom, description) */
    app.post('/newCategorie', (req, res) => {
        let sqlQuery = constants.NEW_CATEGORIE(sessionName(req), sessionPass(req), req.body.nom, req.body.description)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 37 ajouter un produits
        NEW_PRODUIT(surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) */
    app.post('/newProduit', (req, res) => {
        let sqlQuery = constants.NEW_PRODUIT(sessionName(req), sessionPass(req), req.body.nom, req.body.description, 
                                             req.body.photoName, req.body.categorie, req.body.restaurant, req.body.bio, req.body.prixBase)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 38 éditer un restaurant
        EDIT_RESTAURANT(restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) */
    app.post('/editRestaurant', (req, res) => {
        let sqlQuery = constants.EDIT_RESTAURANT(req.body.restaurant, sessionName(req), sessionPass(req), req.body.nom, req.body.description, 
                                                 req.body.photoName, req.body.adresse, req.body.quartier, req.body.telephone)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 39 éditer un produit
        EDIT_PRODUIT(produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) */
    app.post('/editProduit', (req, res) => {
        let sqlQuery = constants.EDIT_PRODUIT(req.body.produit, sessionName(req), sessionPass(req), req.body.nom, req.body.description, 
                                              req.body.photoName, req.body.categorie, req.body.restaurant, req.body.bio, req.body.prixBase)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 40 éliminer un restaurant
        DEL_RESTAURANT(restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) */
    app.post('/delRestaurant', (req, res) => {
        let sqlQuery = constants.DEL_RESTAURANT(req.body.restaurant, sessionName(req), sessionPass(req), req.body.nom, req.body.description, 
                                                req.body.photoName, req.body.adresse, req.body.quartier, req.body.telephone)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 41 éliminer un produits
        DEL_PRODUIT(produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) */
    app.post('/delProduit', (req, res) => {
        let sqlQuery = constants.DEL_PRODUIT(req.body.produit, sessionName(req), sessionPass(req), req.body.nom, req.body.description, 
                                             req.body.photoName, req.body.categorie, req.body.restaurant, req.body.bio, req.body.prixBase)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 42 voir les produits
        LIST_PRODUIT_VENDEUR(surname, password) */
    app.post('/listProduitVendeur', (req, res) => {
        let sqlQuery = constants.LIST_PRODUIT_VENDEUR(sessionName(req), sessionPass(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 43 voir les restaurant
        LIST_RESTAURANT_VENDEUR(surname, password) */
    app.post('/listRestaurantVendeur', (req, res) => {
        let sqlQuery = constants.LIST_RESTAURANT_VENDEUR(sessionName(req), sessionPass(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 44 voir moyenne des évaluations des produits
        EVALUATION_VENDEUR(surname, password) */
    app.post('/evaluationVendeur', (req, res) => {
        let sqlQuery = constants.EVALUATION_VENDEUR(sessionName(req), sessionPass(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 45 voir moyenne évaluation des produits d'un restaurant
        EVAL_RESTAURANT(surname, password, restaurant) */
    app.post('/evalRestaurant', (req, res) => {
        let sqlQuery = constants.EVAL_RESTAURANT(sessionName(req), sessionPass(req), req.body.restaurant)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 46 liste des produits vendu
        LIST_VENTES(surname, password) */
    app.post('/listVentes', (req, res) => {
        let sqlQuery = constants.LIST_VENTES(sessionName(req), sessionPass(req))
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })   

    /* fn 47 liste des produits vendu dans un restaurant
        LIST_VENTES_RESTAURANT(surname, password, restaurant) */
    app.post('/listVentesRestaurant', (req, res) => {
        let sqlQuery = constants.LIST_VENTES_RESTAURANT(sessionName(req), sessionPass(req), req.body.restaurant)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })
}




module.exports.routerMysql = routerMysql;