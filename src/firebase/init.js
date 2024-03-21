import firebase from 'firebase/app'
import 'firebase/firestore'
import config from './hours.js'

// Your web app's Firebase configuration
// const firebaseConfig = firebaseConfig
// console.log(config)
// Initialize Firebase
const app = firebase.initializeApp(config.firebaseConfig)
const beforeApp = firebase.initializeApp(
    config.firebaseConfigBefore,
    'beforeApp',
)

export const db = firebase.firestore(app)
export const dbBefore = firebase.firestore(beforeApp)
