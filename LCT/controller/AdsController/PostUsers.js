import Firestore from '@react-native-firebase/firestore';

function PostUsers(data) {
    return (
        Firestore().collection('Users').doc(data.email).set({
            Name: data.name,
            Image: data.photo,
            Email: data.email,
            PhoneNo:data.num,
            //AccountNo:data.acc,
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.log("Error writing document: ", error);
        })
    );
}

export default PostUsers;