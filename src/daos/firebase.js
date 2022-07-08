const admin= require('firebase-admin');
const service = require('./configFirebase.json');

const firebase=admin.initializeApp({credential:admin.credential.cert(service),
                                    databaseURL:'hhtps://backcoder-c4c58.firebaseio.com'    
})

const firebaseDb = firebase.firestore()


module.exports = {
    firebaseDb,
    admin
}
