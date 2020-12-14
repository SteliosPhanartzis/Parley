import React, { useEffect, useState } from 'react';
import './SidebarServer.css';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import { setServerInfo } from '../features/appSlice';

function SidebarServer() {
    const user = useSelector(selectUser);
    const [servers, setServers] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        db.collection('servers')
        .orderBy("serverName", "asc")
        .onSnapshot(snapshot => (
            setServers(snapshot.docs.map(doc => ({
                id: doc.id,
                server: doc.data(),
            })))
        ))
    }, []);

    const handleAddServer = () => {
        const serverName = prompt('Enter a new server')

        if(serverName) {
            const serverPhoto = prompt('Enter photo URL')
            if(serverPhoto){
                db.collection("servers").add({
                serverName: serverName,
                photo: serverPhoto,
                administrators: [{displayName: user.displayName, uid: user.uid}],
                moderators: []
             })
            }
        }
    }

    return (
        <div className="sidebar__serverList">
            {
                servers.map((server) => (
                    <div className="sidebar__server" 
                        onClick={ () => {
                            dispatch(
                                setServerInfo({
                                    serverId: server.server.id,
                                    serverName: server.server.serverName,
                                })
                            )
                        }}>
                        <img id={server.server.serverName} src={(server.server.photo)?server.server.photo:console.log()} className="sidebar__serverImg" />		
                    </div>
                ))
            }
            <AddIcon onClick={handleAddServer} className="sidebar__addServer" />  
        </div>
    )
}

export default SidebarServer
