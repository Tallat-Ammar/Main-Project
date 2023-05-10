import Firestore, { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
export async function getReviews(apartmentId, reviewsRetrevived) {
console.log(apartmentId);
   const reviewList=[];
var review;
var snapshot = await firebase.firestore()
.collection('Reviews').where('item', '==', apartmentId).get()

 snapshot.forEach((doc)=>{
    review={id: doc.id, data:doc.data()};
    reviewList.push(review);
 });
reviewsRetrevived(reviewList);
}
