import Firebase from './firebaseConfig';


export const AddUser= async (name, email , uid ) =>{
    try {
            return await Firebase.database()
            .ref("users/"+uid).set({
                name:name,
                email:email,
                uuid:uid,

            })
    } catch(err){
        return err
    }
}