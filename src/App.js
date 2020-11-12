import React from 'react';

import './App.css';
import 'firebase/firestore';
import 'firebase/auth';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SignIn from './Components/SignIn';
import SignOut from './Components/SignOut';
import ChatRoom from './Components/ChatRoom';

import config from './Components/Firebase/config'
firebase.initializeApp(config);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Main App
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Mini Chat</h1>
        <SignOut auth={auth}/>
      </header>

      <section>
        {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} user={[user]} />}
      </section>
    </div>
  );
}

export default App;
