import firestore from '@react-native-firebase/firestore';
function DoReservation(reservationTableData, adAvailability){
    firestore()
  .collection('Rooms')
  .doc(reservationTableData.RoomID)
  .update({
    IsAvailable:adAvailability
  })
  .then(() => {
    console.log('Ad availablity updated!');
  }).catch(function(error) {
    console.error("Error writing document: ", error);
    });  
  firestore()
  .collection('Reservations')
  .add({
      Owner: reservationTableData.Owner,
      RoomID: reservationTableData.RoomID,
      CheckIn: reservationTableData.CheckIn,
      CheckOut: reservationTableData.CheckOut,
      RenterID: reservationTableData.RenterID,
      CustomerName: reservationTableData.RenterName,
  })
  .then(() => {
    console.log('Reservation done!');
  }).catch(function(error) {
    console.error("Error writing document: ", error);
});    
}
export default DoReservation;