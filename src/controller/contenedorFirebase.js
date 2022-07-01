import admin from 'firebase-admin'
import config from '../daos/configFirebase.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://' 
});
