import React, { useEffect, useState,useCallback } from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/firestore';
import PostMessages from '../controller/AdsController/PostMessages';
import Firestore from '@react-native-firebase/firestore';
import { findWhere } from 'underscore';

function Chat({navigation,route}) {
    var cList=[];
    var usernow=firebase.auth().currentUser;
    var owner=route.params.apart.Owner;
    var location=route.params.apart.Location;
    var currentuser=usernow.email;
    var chatref;
    if (usernow.email===owner) {
        chatref= Firestore().collection('Chat').doc(owner).collection(route.params.apart.Customer+"-"+owner+"-"+location);
    }
    else{
        chatref= Firestore().collection('Chat').doc(owner).collection(usernow.email+"-"+owner+"-"+location);
    }
    
    const [messages,setMessages]=useState([]);
   useEffect(()=>{
       const load=chatref.onSnapshot(querySnapshot=>{
         const messageDB=querySnapshot.docChanges().filter(({type})=>type==='added')
                                      .map(({doc})=>{
                                          const message=doc.data()
                                          return {...message,createdAt:message.createdAt.toDate()}
                                        }).sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime())
                                      appendMessages(messageDB)
       })
       return () => load()
   },[])

   const appendMessages = useCallback(
    (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
)
   function updateArray(messages){
    if (usernow.email===owner) {
        (async () => {
            const writes=messages.map(m=>chatref.add(m))
            await Promise.all(writes)
        })();
    }
    else{
        var listref=Firestore().collection('Chat').doc(owner);
        listref.get().then(function(doc){
            if (!(doc.exists)) {
                console.log('no doc');
                listref= Firestore().collection('Chat').doc(owner).set({exist:true});
            }
            if (doc.data().collections) {
                cList=doc.data().collections;
            }
            var newElement=usernow.email+"-"+owner+"-"+location;
            var item={collection:newElement, customerName:usernow.displayName, customerId:usernow.email, location:route.params.apart.Location}
            if (findWhere(cList, item) == null) {
                cList.push(item);
                listref.set({
                    collections:cList, 
                }).then(function(){
                    (async () => {
                        const writes=messages.map(m=>chatref.add(m))
                        await Promise.all(writes)
                    })();
                 })
            }
            else{
                (async () => {
                    const writes=messages.map(m=>chatref.add(m))
                    await Promise.all(writes)
                })();
            }
        })
    }  
  }
    return (
        <GiftedChat 
        messages={messages} 
        user={{_id:usernow.email}} 
        onSend={updateArray}
        />
          
    );
}

export default Chat;

