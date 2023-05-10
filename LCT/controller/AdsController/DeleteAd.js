import Firestore from '@react-native-firebase/firestore';
import{Alert} from 'react-native';

function DeleteAd(location) {
    const showAlert = (alertMsg) =>
  Alert.alert(
    "Attention",
    alertMsg,
    [
      {
        text: "Ok",
        style: "ok",
      },
    ],
    {
      cancelable: true,
    }
  );
    return (
        
        Firestore().collection("Rooms").doc(location).delete().then(function() {
            showAlert("Ad successfully deleted!");
        }).catch(function(error) {
            showAlert("Error removing document: "+ error);
        })
        
    );
}
export default DeleteAd;