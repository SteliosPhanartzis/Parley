import '../App.css';
import 'firebase/firestore';
import 'firebase/auth';

function ChatMessage(props){
    let auth = props.auth
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{ text }</p>
    </div>
    )
  }

export default ChatMessage;