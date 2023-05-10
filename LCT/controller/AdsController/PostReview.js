import Firestore from '@react-native-firebase/firestore';

function PostReview(data) {
    return (
        Firestore().collection('Reviews').add({
            name: data.name,
            profile: data.photo,
            email: data.email,
            item:data.item,
            comment:data.des,
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.log("Error writing document: ", error);
        })
    );
}
export default PostReview;
