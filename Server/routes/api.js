/********************************************************
    API Router
*********************************************************
    Andres Vicente Caballero Cantillo
    Alex erne
    Projet Transversal I
    Group 5 - Système de recommendation	de produits
**********************************************************/
var multer = require('multer')

const api = (app, sessionStore)=> {

/*-------------------------------------------------
|                 MULTER CONFIG                   |
-------------------------------------------------*/

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            let random = Math.round(Math.random() * (9000 - 1000) + 1000) 
            const name = `${Date.now()}-${random + file.mimetype.replace('image/', '.')}` // nom du fichie
            const photoName = cb(null, name)
            return photoName
        }
    })

    var upload = multer({ storage: storage }).array('file')


    /*---------------------
    |      SERVICES       |
    ---------------------*/

    app.get(`/`, function (req, res) {
        res.send('Server is ok!')
    })

    app.post('/location', function (req, res) {
        res.json([{ id: 1, name: "Carouge" }, { id: 2, name: "Lignon" },{ id: 3, name: "moillesulaz" },{ id: 4, name: "jonction" }])
    })

    app.post('/sessions', (req, res) => {
        sessionStore.all((err, session)=>{
            err ? console.log(err) : res.json({session:session})
        })
    })
    
    app.post('/storeGet', (req, res) => {
        let sid = req.body.id
        sessionStore.get(sid, (err, session)=>{
            err ? console.log(err) : res.json({session:session})
        })
    })
    
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
