import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD50qyZZXRrjk-ru9xifPABG85NnFpAJzM',
  authDomain: 'coinbook-b9536.firebaseapp.com',
  projectId: 'coinbook-b9536',
  storageBucket: 'coinbook-b9536.appspot.com',
  messagingSenderId: '22007385713',
  appId: '1:22007385713:web:7f6486243b61604b3695d0',
  measurementId: 'G-3XZERPBNHV'
}

const app = initializeApp(firebaseConfig)

// eslint-disable-next-line import/prefer-default-export
export const auth = getAuth(app)
export const db = getFirestore(app)
