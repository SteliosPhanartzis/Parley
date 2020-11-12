import { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from './ChatMessage'

function ChatRoom(props){

    const dummy = useRef()
    const auth = props.auth;
    const firestore = props.firestore;
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(50);
  
    const [messages] = useCollectionData(query, { idField: 'id'});
    const [formValue, setFormValue] = useState('');
  
    const sendMessage = async(e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      });
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth} />)}
                <div ref={dummy}></div>
            </main>
  
            <form onSubmit={sendMessage}>
              <input value={formValue} onChange={ (e) => setFormValue(e.target.value) }/>
              <button type="submit">Send</button>
            </form>
        </>
    )
}

export default ChatRoom;