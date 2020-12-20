import { Avatar } from '@material-ui/core'
import React from 'react'
import Linkify from 'react-linkify';
import "./Message.css"

function Message({ timestamp, message, user, file, fileType }) {
    let url = "not defined";
    function verifyFile() {
        let el = null;
        if(file){
            switch(fileType){
                case("image/apng"):
                case("image/avif"):
                case("image/bmp"):
                case("image/gif"):
                case("image/jpeg"):
                case("image/png"):
                case("image/svg+xml"):
                case("image/webp"):
                case("image/x-icon"):
                    el = <img src={file} className="attached__media message__attachment" />
                    break;
                case("audio/mpeg"):
                case("audio/ogg"):
                case("audio/wav"):
                    el = <audio controls className="message__attachment"><source src={file}/>Audio tag unsupported</audio>
                    break;
                case("video/mp4"):
                case("video/ogg"):
                case("video/webm"):
                    el = <video controls src={file} className="attached__media message__attachment"></video>
                    break;
                default:
                    el = <a href={file} target="_blank">{file}</a>
                    break;
            }
        }
        return el;
    }
    return (
        <div className="message">
            <Avatar className="message__avatar" src={user.photo}/>
            <div className="message__info">
                <h4>
                    { user.displayName }
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>

                <p>
                    <Linkify properties={{target: '_blank', url: Linkify.MATCH}} >
                        { message }
                    </Linkify>
                    { console.log(url) }
                </p>
                {verifyFile()}
            </div>
        </div>
    )
}

export default Message;
