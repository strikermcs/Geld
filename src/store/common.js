import firebase from "firebase/compat/app"

export function getUid(){
  const user = firebase.auth().currentUser
  return user ? user.uid : null
}