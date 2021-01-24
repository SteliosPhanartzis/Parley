import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser, login, logout } from './features/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import db, { auth } from './firebase';
import Modal from './components/Modal'
import Members from './components/Members';
import firebase from 'firebase'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [modalDisplay, setModalDisplay] = useState("none");
  function toggleModal(){
    (modalDisplay == "none")?
      setModalDisplay("flex")
      :setModalDisplay("none")
  }
  
  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      let userCollection = db.collection("users");
      if (authUser) {
        let docRef = userCollection.where("uid", "==", authUser.uid).limit(1).get();
        await docRef.then((snapshot) => {
          console.log(authUser)
          if(snapshot.docs.length == 0){
            userCollection.add({
              uid: authUser.uid,
              displayName: authUser.displayName,
              photo: authUser.photoURL,
              status: "online"
            })
          }
          else
          snapshot.forEach((doc) => {
              userCollection.doc(doc.id).update({status: "online"})
              return;
            })
        })
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
            status: "online"
          })
        );
      } else {
          if(user){
            await dispatch(logout());
          }
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user? (
        <>
          <Sidebar/>
          <Chat />
          <Members />
          <Modal displayState={modalDisplay} displayHook={setModalDisplay} />
        </>
      ):(
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;