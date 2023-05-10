import Firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { v4 as uuidv4 } from 'uuid';

async function PostAds (adData,edit) { 
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
    var imgs=[];
    if(edit!=="myrooms"){
    var fileExtension;
    await Promise.all(adData.images.map(async (image)=>{
        try {
            fileExtension=image.uri.split('.').pop();
            var uid=uuidv4();
            const storageRef=storage().ref('Ads/images/'+(uid+"."+fileExtension));
            await storageRef.putFile(image.uri)
            const url=await storageRef.getDownloadURL()
                imgs.push({uri: url,})                
        }
        catch(err) {
            showAlert('errorr'+ err);
        }  
    }));
    //console.log("STORED ALL IMAGES IN FIRESTORE", imgs);
    Firestore().collection("Rooms").where("Location","==",adData.Location).get()
    .then((snap) => {
        if(snap.size==0 || edit=="myrooms")//skip upload image
    {
        Firestore().collection('Rooms').doc(adData.Location).set({
            Charges: adData.Charges,
            Description: adData.Description,
            Images: imgs,
            IsAvailable: adData.IsAvailable,
            Location:adData.Location,
            NoOfRooms:adData.NoOfRooms,
            Owner:adData.email,
            Title:adData.Title,
            }).then(function() {
                showAlert("Changes made successfully!");
            })
            .catch(function(error) {
                showAlert("Error writing document: "+ error);
            })
            }else{
                showAlert("Another ad with same credentials already exist")
        }
     })
    }
}       
     

    
export default PostAds;
/*fireauth.onAuthStateChanged(function(user) {
           if (user) {
               var user = fireauth.currentUser;
               firestore.collection("song").doc("Rock").set({

               })
               .then(function(){
                   console.log("Document successfully written!");
               })
               .catch(function(error){
                   console.error("Error writing document: ", error);
               })
           });
         }
         } else {
         // No user is signed in.
         console.log("not yet log in")
         }
         }); */