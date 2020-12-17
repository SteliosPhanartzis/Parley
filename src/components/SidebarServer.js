import React from 'react';
import './SidebarServer.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { setServerInfo } from '../features/appSlice';
import db from '../firebase';
function SidebarServer({serverId, serverName, photo, channels, setChannels}) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className="sidebar__server" 
            onClick={ () => {
                dispatch(
                    setServerInfo({
                        serverId: serverId,
                        serverName: serverName,
                    })
                )
                db.collection('servers/' + serverId + '/channels')
                    .orderBy("channelName", "asc")
                    .onSnapshot(snapshot => (
                        setChannels(snapshot.docs.map(doc => ({
                            id: doc.id,
                            channel: doc.data(),
                        })))
                    ))
                    console.log(channels);
            }}
            >
            <img id={serverId} name={serverName} src={(photo)?photo:""} className="sidebar__serverImg" />		
        </div>
    )
}

export default SidebarServer
