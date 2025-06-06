const { credential } = require('firebase-admin');
const multer  = require('multer');
const firebase_storage = require('multer-firebase-storage');
const firebase = require('./firebase.config');
const serviceaccount = require('../drive-376a8-firebase-adminsdk-fbsvc-dcf19c7755.json')

const storage = firebase_storage({
    credentials : firebase.credential.cert(serviceaccount),
    bucketName : 'drive-376a8.firebasestorage.app',
    unique : true
})

const upload = multer({
    storage : storage,
})

module.exports = upload;