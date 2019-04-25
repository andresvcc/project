/********************************************************
    API Router
*********************************************************
    Andres Vicente Caballero Cantillo
    Alex erne
    Projet Transversal I
    Group 5 - Système de recommendation	de produits
**********************************************************/
var multer = require('multer')

const api = (app)=> {

/*-------------------------------------------------
|                 MULTER CONFIG                   |
-------------------------------------------------*/

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            let random = Math.round(Math.random() * (2000 - 1000) + 1000) 
            const name = Date.now() + '-' + random + file.mimetype.replace('image/', '.') // nom du fichie
            const photoName = cb(null, name)
            return photoName
        }
    })

    var upload = multer({ storage: storage }).array('file')


    /*---------------------
    |      SERVICES       |
    ---------------------*/

    /*des routages pour faire des test avec l'interface*/
    app.get(`/`, function (req, res) {
        res.send('Server is ok!')
      })

    app.get('/categorie', function (req, res) {
        res.json([{ id: 1, name: "catego1" }, { id: 2, name: "catego2" }, { id: 3, name: "burger" }])
    })

    app.get('/location', function (req, res) {
        res.json([{ id: 1, name: "Carouge" }, { id: 2, name: "Lignon" },{ id: 3, name: "Lausanne" }])
    })

    app.get('/Villes', function (req, res) {
        res.json([{ id: 1, name: "Geneve" }, { id: 2, name: "Nyon" }, { id: 3, name: "Lausanne" }, { id: 3, name: "Lausanne2" }])
    })
    //***************************************************/

    app.get('/times', function (req, res) {
        let name = req.session.surname ? req.session.surname : 'inconue'
        if (req.session.page_views) {
            req.session.page_views++;
            res.json({ ok: name + " You visited this page " + req.session.page_views + " times"});

        } else {

            req.session.page_views = 1;
            res.json({ok: name + " Welcome to this page for the first time!"});
        }
    });

    app.get('/surnamesession', function(req,res){
        console.log("# Client Username check "+ req.session.surname);
        res.json({ok: req.session.surname})
    });

    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err)
                return res.status(500).json(err)
                
                // A Multer error occurred when uploading.
            } else if (err) {
                console.log(err)
                return res.status(500).json(err)
                // An unknown error occurred when uploading.
            }
            return res.status(200).send(req.files)
            // Everything went fine.
        })
    });
}

module.exports.api = api;
