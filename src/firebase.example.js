import firebase from 'firebase/app' // Firebase Core
import 'firebase/database' // Firebase Database
import 'firebase/auth' // Firebase Authenticator

const config = {}

// Initializing Firebase App
firebase.initializeApp(config)

// Exporting the firebase database
export const database = firebase.database()

// Exporting the firebase authenticator
export const auth = firebase.auth()