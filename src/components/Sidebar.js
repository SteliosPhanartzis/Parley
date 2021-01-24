import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import SidebarServer from './SidebarServer';
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import { SignalCellularAltRounded } from '@material-ui/icons';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import HeadsetIcon from '@material-ui/icons/Headset';
import MicIcon from '@material-ui/icons/Mic';
import db, { auth } from '../firebase';
import { selectServerId, selectServerName } from '../features/appSlice';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const [servers, setServers] = useState([]);
    const serverId = useSelector(selectServerId);
    const serverName = useSelector(selectServerName);
    let userCollection = db.collection("users");

    useEffect(() => {
        db.collection('servers')
        .orderBy("serverName", "asc")
        .onSnapshot(snapshot => (
            setServers(snapshot.docs.map(doc => ({
                id: doc.id,
                server: doc.data(),
            })))
        ));
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel')
        if(serverId && channelName) {
            db.collection("servers/" + serverId + "/channels").add({
                channelName: channelName,
            })
        }
    }

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
        <div className="sidebar__panel">
        <div className="sidebar__serverList">
            {
                servers.map((server) => (
                    <SidebarServer 
                        serverId = {server.id} 
                        serverName = {server.server.serverName} 
                        photo = {server.server.photo} 
                        channels = {channels} 
                        setChannels = {setChannels} 
                    />
                ))
            }
            <AddIcon onClick={handleAddServer} className="sidebar__addServer" />  
        </div>
        <div className="sidebar">
            <div className="sidebar__top">
                <h4>{serverName}</h4>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({id, channel}) => (
                            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                    ))}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltRounded 
                    className="sidebar__voiceIcon"
                    fontSize="initial"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar id="sidebar__avatar" 
                    onClick={() => {
                        userCollection.where("uid", "==", user.uid).limit(1)
                        .onSnapshot(snapshot => {
                            snapshot.docs.forEach(doc => {
                                userCollection.doc(doc.id).update({status: "offline"})
                            })
                        })
                        // Signout user, then update state to force page refresh, force window refresh to make sure
                        auth.signOut()
                        .then(setChannels([...channels, {"id":"dummy", "channel":{}}]))
                        .then(window.location.reload());
                    }} 
                    src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>
                        {user.displayName}
                    </h3>
                    <p>
                        #{user.uid.substring(0,10)}
                    </p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
        </div>
    )
}

export default Sidebar
