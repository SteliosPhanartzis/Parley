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
            <div className="sidebar__server"
                onClick={ () => {
                    dispatch(
                        setServerInfo({
                            serverId: 1, //id,
                            serverName: "Hello world",//channelName,
                        })
                    )
                }
                }><img src="https://www.shareicon.net/data/256x256/2016/01/03/230309_kronk_256x256.png" className="sidebar__serverImg"/></div>
            <div className="sidebar__server"><img src="https://img.fireden.net/sci/image/1549/15/1549150062827.png" className="sidebar__serverImg"/></div>
            <div className="sidebar__server"><img src="https://cdn.theorg.com/00ee9efe-9828-47c3-ba2f-61a4b504b8f4_thumb.jpg" className="sidebar__serverImg"/></div>
            <AddIcon onClick={handleAddServer} className="sidebar__addServer" />  
        </div>
    )
}

export default SidebarServer
