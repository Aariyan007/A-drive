const express = require('express');
const authMiddleware = require('../middleware/auth')
const firebase  = require('../config/firebase.config')

const router = express.Router();

const upload = require('../config/multer.config');

const fileModel = require('../model/files.models');
const user = require('../model/schema');

router.get('/', authMiddleware, async (req, res) => {
    const userFiles = await fileModel.find({
        user: req.user.userID   // Make sure this exists
    });

    console.log("Files for user:", req.user.userID);
    console.log(userFiles);

    res.render('home',{
        files : userFiles
    });
});


router.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const newfile = await fileModel.create({
            path: req.file.path,           
            originalname: req.file.originalname,
            user: req.user.userID
        });
        res.json(newfile);  // Send created file info as response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/download/:path',authMiddleware,async(req,res)=>{
    const loggedinUserID = req.user.userID;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user : loggedinUserID,
        path : path
    });

    if(!file){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    const signedURL = await firebase.storage().bucket().file(path).getSignedUrl({
        action : 'read',
        expires : Date.now() + 60 * 1000
    })
    res.redirect(signedURL[0])

})

module.exports = router;