  const admin = require('firebase-admin');
  const service = require('./firebase-credentials.json');
  
  const firebase = admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: 'https://backcoder-c4c58.firebaseio.com'
  });
  
  const firebaseDb = firebase.firestore();
  
  module.exports = {
    firebaseDb,
    admin
  };
  