const Firebase = require('firebase-admin')

const serviceaccount = require('../drive-376a8-firebase-adminsdk-fbsvc-dcf19c7755.json')

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceaccount),
    storagebucket  : 'drive-376a8.firebasestorage.app'
})

module.exports = Firebase