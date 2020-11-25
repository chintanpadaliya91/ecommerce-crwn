import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyB0qkM_of6trLDeIAvF6AsFnUoVA8cG_kY",
  authDomain: "ecommerce-db-6c3f1.firebaseapp.com",
  databaseURL: "https://ecommerce-db-6c3f1.firebaseio.com",
  projectId: "ecommerce-db-6c3f1",
  storageBucket: "ecommerce-db-6c3f1.appspot.com",
  messagingSenderId: "254665913931",
  appId: "1:254665913931:web:3dc98f8546008f0115bfce",
  measurementId: "G-97J9MQRM12"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef

}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase