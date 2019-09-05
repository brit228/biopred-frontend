import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBj-mzWxGHxJrDjufHwteHoDYUT2Q5WdB0",
  authDomain: "biopred.app",
  databaseURL: "https://biopred.firebaseio.com",
  projectId: "biopred",
  storageBucket: "biopred.appspot.com",
  messagingSenderId: "972348783868",
  appId: "1:972348783868:web:cabe844fe1fc46ba"
};

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.store = app.firestore()
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)
}

export default Firebase