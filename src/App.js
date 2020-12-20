import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser, login, logout } from './features/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import { auth } from './firebase';
import Modal from './components/Modal'
import Members from './components/Members';

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
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user? (
        <>
          <Sidebar />
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