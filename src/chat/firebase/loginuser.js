import Firebase from './firebaseConfig';


export const loginUser= (email, password  ) =>{
    try {
return Firebase.auth().signInWithEmailAndPassword(email,password)
    } catch(error){
        return error
    }
    
}