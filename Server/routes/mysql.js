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
var fs = require('fs');
var gutil = require('gulp-util');

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


const routerMysql = (app, sessionStore)=>{

    /*-------------------------------------------------
    |             System Fonction Aide                |
    --------------------------------------------------*/

    startSessionServer =()=>{
        let sqlQueryNewSessionServer = constants.NEW_SESSION_SERVER
        let sqlQueryCurrenSessionServer = constants.CURRENT_SESSION_SERVER
        connection.query(sqlQueryNewSessionServer, (err, resultat) => {
            err ? console.log('error, imposible creer nouvelle sessionServer'): 
                (
                    connection.query(sqlQueryCurrenSessionServer, (err, resultat) => {
                        err ? console.log('probleme avec la session', err): 
                            console.log(`start session ${resultat[0].id_session} date:`, resultat[0].time_date )
                    })
                )
        })
    }
    
    startSessionServer();

    userAction = (surname, action, value) =>{
        let sqlQuery = constants.USER_ACTION(surname, action, value)
        connection.query(sqlQuery, (err, resultat) => {
            err ? console.log(gutil.colors.red(err)) : console.log(gutil.colors.cyan(surname, action, value))
        }) 
    }

    userSession = (req, res, callBack) => {
        let sid = req.body.id
        sessionStore.get(sid, (err, session)=>{
            err ? res.json({ok:false, err:err}) : (
                callBack(session)
            )
        })
    }

    deleteUser = (surname) =>{
        connection.query(`DELETE FROM users WHERE surname = '${surname}'`, (err, resultat) => {
            if(err) throw err 
        })
    }

    isDisponible = (req, callback) =>{
        let sqlQuery = constants.FIND_SIMPLE_USER(req.body.surname)
        connection.query(sqlQuery, (err, resultat) => {
            err ? callback( false ) : callback( resultat[0] ? false : true )
        })
    }

    newUser = (req, callback) =>{
        let sqlQuery = constants.NEW_USER(req.body.surname, req.body.password, req.body.email)
        isDisponible(req,(solve)=>{
            solve ? (
                connection.query(sqlQuery, (err, resultat) => {
                    err ? (console.log(err),callback(2)) : callback(3)
                })
            ):callback(1)
        })
    }

    newAcheteur = (req, res) =>{
        newUser(req, (solve)=>{
            switch (solve) {
                case 1:                    
                    res.json({ ok: false, msg:`Surnom: ${req.body.surname} ne pas disponible`})
                    break;
                case 2:
                    res.json({ ok: false, msg:'error creando user'})
                    break;
                case 3:
                    let sqlQuery = constants.NEW_ACHETEUR(req.body.surname, req.body.password, req.body.quartier)
                    connection.query(sqlQuery, (err, resultat) => {
                        err ? (
                            deleteUser(req.body.surname),
                            console.log(err),
                            res.json({ ok: false, tp:3, msg:err })
                        ) : (
                            userAction(req.body.surname, 'CREATE', 'ACHETEUR'),
                            res.json({ ok: true, tp:3, msg:'succes'})
                        )
                    })
                    break;
                default:
                    res.json({ ok: true, msg:'error inconue'})
                    break;
            }
        })
    }

    newVendeur = (req, res) =>{
        newUser(req, (solve)=>{
            switch (solve) {
                case 1:                    
                    res.json({ ok: false, msg:`Surnom: ${req.body.surname} ne pas disponible`})
                    break;
                case 2:
                    res.json({ ok: false, msg:'error creando user'})
                    break;
                case 3:
                    let sqlQuery = constants.NEW_VENDEUR(req.body.surname, req.body.password, req.body.nom, req.body.prenom, req.body.adresse, req.body.bancaire)
                    connection.query(sqlQuery, (err, resultat) => {
                        err ? (
                            deleteUser(req.body.surname),
                            console.log(err),
                            res.json({ ok: false, tp:3, msg:err })
                        ) : (
                            userAction(req.body.surname, 'CREATE', 'ACHETEUR'),
                            res.json({ ok: true, tp:3, msg:'succes'})
                        )
                    })
                    break;
                default:
                    res.json({ ok: true, msg:'error inconue'})
                    break;
            }
        })
    }

    console.log(gutil.colors.green('File exists. Deleting now ...'));

    deleteFile=(nom)=>{   
        fs.unlink(`./public/images/${nom}`, function(err) {
            if(err && err.code == 'ENOENT') {
                // file doens't exist
                console.log(gutil.colors.red("File doesn't exist, won't remove it."));
            } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.log(gutil.colors.red("Error occurred while trying to remove file"));
            } else {
                console.log(gutil.colors.green(`file ${nom}removed`));
            }
        });
    }

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
            err ? res.json({ ok: false, error: err }) : res.json(resultat)
        })
    })

    /* fn 9	 iste des plats
        LIST_PLATS */
    app.post('/listProduits', (req, res) => {
        let sqlQuery = constants.LIST_PRODUITS
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
        NEW_ACHETEUR(surname, password, quartier) */
    app.post('/newAcheteur', (req, res) => {
        newAcheteur(req, res)        
    })

    /* fn 12 add un nouveau vendeur
        NEW_VENDEUR(surname, password, nom, prénom, adresse, quartier, bancaire, comptePay, adresse) */
    app.post('/newVendeur', (req, res) => {
        newVendeur(req, res)
    })

    //function pour aider fn 13 LOGIN
    login = (resultat,req)=>{
        let status = resultat == '' ? (
            {ok:false, resultat:'user ou mot de passe incorrecte'}
        ):(
            req.session.surname = resultat[0].surname,
            req.session.password = req.body.password,
            req.session.typeuser = resultat[0].typeuser,
            req.session.sessID = req.session.id,
            userAction(req.session.surname, 'LOGIN', req.body.password), //(surname, action, value)
            { ok: true, surname: req.session.surname, typeUser:  req.session.typeuser, sessID: req.sessionID}
        )
        return status 
    }

    /* fn 13 demande de login
        LOGIN(surname, password) */
    app.post('/userLogin', (req, res)=> {
        let surname = req.body.surname ? req.body.surname : ''
        let password = req.body.password ? req.body.password : ''
        let sqlQuery = constants.FIND_USER(surname, password)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) :
                res.json(login(resultat, req))
        })
    });

    /* fn 14 demande de logout
        LOGOUT(surname, password) */
    app.post('/userLogout', (req, res) => {
        userSession(req, res, (session)=>{
            let ok = session ? (
                sessionStore.destroy(req.body.id, (err)=>{
                    err? console.log(err) : userAction(session.surname, 'LOGOUT', '')
                }),
                true
            ):false
            res.json({ok:ok})           
        })
    })

    /* fn 15 fournir action de session
        USER_ACTION(surname, password, action) */
    app.post('/userAction', (req, res) => {
        userSession(req, res, (session)=>{
            userAction(session.surname, req.body.action, req.body.value)
            res.json({ok:'ok', surname:session.surname})
        })
    })

    /* fn 16 changer password
        CHANGE_PASSWORD(surname, password, newPassword) */
    app.post('/changePassword', (req, res) => {
        let sqlQuery = constants.CHANGE_PASSWORD(req.body.surname, req.body.password, req.body.newPassword)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 17 fermer une compte
        CLOSE_ACCOUNT(surname, password) */
    app.post('/closeAccount', (req, res) => {
        let sqlQuery = constants.CLOSE_ACCOUNT(req.body.surname, req.body.password)
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
        let sqlQuery = constants.FIND_PRODUIT_NOM(req.body.nomProduit, req.body.surname)
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
        let sqlQuery = constants.FIND_PRODUIT_QUARTIER(req.body.nomProduit, req.body.surname)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 22 dernières categorie acheté
        CATEGORIE_ACHETEUR(surname) */
    app.post('/categorieAcheteur', (req, res) => {
        let sqlQuery = constants.CATEGORIE_ACHETEUR(req.body.surname)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 23 liste de produits recommande
        RECOMMANDATION(surname) */
    app.post('/recommandation', (req, res) => {
        let sqlQuery = constants.RECOMMANDATION(req.body.surname)
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

    /* fn 29 ajouter un produits au panier
        ADD_PRODUIT_PANIER(surname, password, produit, quantite) */
    app.post('/addProduitPanier', (req, res) => {
        let sqlQuery = constants.ADD_PRODUIT_PANIER(req.body.surname, req.body.password, req.body.produit, req.body.quantite)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 30 effacer un produits du panier
        DEL_PRODUIT_PANIER(surname, password, produit) */
    app.post('/delProduitPanier', (req, res) => {
        let sqlQuery = constants.DEL_PRODUIT_PANIER(req.body.surname, req.body.password, req.body.produit)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 31 éditer un produits du panier
        EDIT_PRODUIT_PANIER(surname, password, produit, quantite) */
    app.post('/editProduitPanier', (req, res) => {
        let sqlQuery = constants.EDIT_PRODUIT_PANIER(req.body.surname, req.body.password, req.body.produit, req.body.quantite)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })
    
    /* fn 32 payer un produits
        PAYER_PRODUIT(surname, password, produit) */
    app.post('/payerProduit', (req, res) => {
        let sqlQuery = constants.PAYER_PRODUIT(req.body.surname, req.body.password, req.body.produit)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 33 liste des achat déjà effectues
        ACHATS_LIST(surname, password) */
    app.post('/achatList', (req, res) => {
        let sqlQuery = constants.ACHATS_LIST(req.body.surname, req.body.password)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 34 évaluer un produits acheté
        EVALUER_PRODUIT(surname, password, produit) */
    app.post('/evaluerProduit', (req, res) => {
        let sqlQuery = constants.EVALUER_PRODUIT(req.body.surname, req.body.password, req.body.produit)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /*---------------------
    |       VENDEUR       |
    ---------------------*/

    /* fn 35 créer une restaurant
        NEW_RESTAURANT(surname, password, nom, description, photoName, adresse, quartier, telephone) */
    app.post('/newRestaurant', (req, res) => {
        userSession(req, res, (session)=>{
            let sqlQuery = constants.NEW_RESTAURANT(session.surname, session.password, req.body.nom, 
                                                    req.body.description, req.body.photoName, req.body.adresse, 
                                                    req.body.quartier, req.body.telephone)          
            
            connection.query(sqlQuery, (err, resultat) => {
                err ? res.json({ ok: false, error: err }) : (
                    userAction(session.surname,'CREER_RESTAURANT',req.body.nom),
                    res.json({ ok: true, response: resultat })
                )
            })
        })
    })

    /* fn 36 ajouter une catégorie
        NEW_CATEGORIE(surname, password, nom, description) */
    app.post('/newCategorie', (req, res) => {
        let sqlQuery = constants.NEW_CATEGORIE(req.body.surname, req.body.password, req.body.nom, req.body.description)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 37 ajouter un produits
        NEW_PRODUIT(surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) */
    app.post('/newProduit', (req, res) => {
        userSession(req, res, (session)=>{
            let sqlQuery = constants.NEW_PRODUIT(session.surname, session.password, req.body.nom, req.body.description, 
                                                 req.body.photoName, req.body.categorie, req.body.restaurant, req.body.bio, req.body.prixBase)  

            connection.query(sqlQuery, (err, resultat) => {
                err ? res.json({ ok: false, error: err }) : (
                    userAction(session.surname,'CREER_PRODUIT',req.body.nom),
                    res.json({ ok: true, response: resultat })
                )
            })
        })
    })

    /* fn 38 éditer un restaurant
        EDIT_RESTAURANT(restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) */
    app.post('/editRestaurant', (req, res) => {
        let sqlQuery = constants.EDIT_RESTAURANT(req.body.restaurant, req.body.surname, req.body.password, req.body.nom, req.body.description, 
                                                 req.body.photoName, req.body.adresse, req.body.quartier, req.body.telephone)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 39 éditer un produit
        EDIT_PRODUIT(produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) */
    app.post('/editProduit', (req, res) => {
        let sqlQuery = constants.EDIT_PRODUIT(req.body.produit, req.body.surname, req.body.password, req.body.nom, req.body.description, 
                                              req.body.photoName, req.body.categorie, req.body.restaurant, req.body.bio, req.body.prixBase)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 40 éliminer un restaurant
        DEL_RESTAURANT(restaurant, surname, password, nom, description, photoName, adresse, quartier, telephone) */
    app.post('/delRestaurant', (req, res) => {
        userSession(req, res, (session)=>{
            let sqlQuery = constants.DEL_RESTAURANT(session.surname, session.password, req.body.nom)          
            connection.query(sqlQuery, (err, resultat) => {
                err ? res.json({ ok: false, error: err }) : (
                    userAction(session.surname,'EFFACER_RESTAURANT',req.body.nom),
                    req.body.photoName !== 'null' ?  deleteFile(req.body.photoName) : console.log('not file'),
                    res.json({ ok: true, response: resultat })
                )
            })
        })
    })  

    /* fn 41 éliminer un produits
        DEL_PRODUIT(produit, surname, password, nom, description, photoName, categorie, restaurant, bio, prixBase) */
    app.post('/delProduit', (req, res) => {
        userSession(req, res, (session)=>{
            let sqlQuery = constants.DEL_PRODUIT(session.surname, session.password, req.body.nom, req.body.restaurant)          
            connection.query(sqlQuery, (err, resultat) => {
                err ? res.json({ ok: false, error: err }) : (
                    userAction(session.surname,'EFFACER_PRODUIT',(req.body.nom+', '+req.body.restaurant)),
                    req.body.photoName !== 'null' ?  deleteFile(req.body.photoName) : console.log('not file'),
                    res.json({ ok: true, response: resultat })
                )
            })
        })
    })

    /* fn 42 voir les produits
        LIST_PRODUIT_VENDEUR(surname, password) */
    app.post('/listProduitVendeur', (req, res) => {
        let sqlQuery = constants.LIST_PRODUIT_VENDEUR(req.body.surname, req.body.password)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 43 voir les restaurant
        LIST_RESTAURANT_VENDEUR(surname, password) */
    app.post('/listRestaurantVendeur', (req, res) => {
        userSession(req, res, (session)=>{
            let sqlQuery = constants.LIST_RESTAURANT_VENDEUR(session.surname, session.password)
            connection.query(sqlQuery, (err, resultat) => {
                err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
            })
        })
    })

    /* fn 44 voir moyenne des évaluations des produits
        EVALUATION_VENDEUR(surname, password) */
    app.post('/evaluationVendeur', (req, res) => {
        let sqlQuery = constants.EVALUATION_VENDEUR(req.body.surname, req.body.password)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 45 voir moyenne évaluation des produits d'un restaurant
        EVAL_RESTAURANT(surname, password, restaurant) */
    app.post('/evalRestaurant', (req, res) => {
        let sqlQuery = constants.EVAL_RESTAURANT(req.body.surname, req.body.password, req.body.restaurant)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })

    /* fn 46 liste des produits vendu
        LIST_VENTES(surname, password) */
    app.post('/listVentes', (req, res) => {
        let sqlQuery = constants.LIST_VENTES(req.body.surname, req.body.password)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })   

    /* fn 47 liste des produits vendu dans un restaurant
        LIST_VENTES_RESTAURANT(surname, password, restaurant) */
    app.post('/listVentesRestaurant', (req, res) => {
        let sqlQuery = constants.LIST_VENTES_RESTAURANT(req.body.surname, req.body.password, req.body.restaurant)
        connection.query(sqlQuery, (err, resultat) => {
            err ? res.json({ ok: false, error: err }) : res.json({ ok: true, response: resultat })
        })
    })
}




module.exports.routerMysql = routerMysql;