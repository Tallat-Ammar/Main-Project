import Firestore from '@react-native-firebase/firestore';
function PostMessages(data) {
    console.log(data);
   return (
        Firestore().collection('Chat').doc(data.Owner).collection(data.Message[0].user).doc().set({
            Message: data.Message,
            Location:data.Location,
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.log("Error writing document: ", error);
        })
    );
}
export default PostMessages;