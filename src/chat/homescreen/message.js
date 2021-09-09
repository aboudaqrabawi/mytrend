import Firebase from '../firebase/firebaseConfig';


export const SendMessage= async (currentUid , guestUid, message  ) =>{
    try {
return await Firebase.database()
            .ref("messages/"+currentUid).child(guestUid)
            .push({
                sender:currentUid,
                reciever:guestUid,
                message:message
            })
    } catch(error){
        return error
    }
    
}
export const RecieveMessage= async (currentUid , guestUid, message  ) =>{
    try {
return await Firebase.database()
            .ref("messages/"+guestUid).child(currentUid)
            .push({
                sender:currentUid,
                reciever:guestUid,
                message:message
            })
    } catch(error){
        return error
    }
    
}