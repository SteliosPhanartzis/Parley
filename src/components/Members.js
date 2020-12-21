import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectMembersList, setMembersList } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './Members.css'

function Members() {
    // const membersList = useSelector(selectMembersList);
    let userCollection = db.collection("users");
    const [members, setMembers] = useState([]);
    // const user = useSelector(selectUser);
    useEffect(() => {
        userCollection.onSnapshot(snapshot => (
            setMembers(snapshot.docs.map(doc => ({
                id: doc.id,
                user: doc.data()
            })))
        ))
    }, []);
        // if (membersList)
            // membersList.array.forEach(member => {
                // if(member.status == "online")
            // })
    return (
        <div className="members">
            {/* Pull users in specified server / channel from firebase and iterate for each list */}
            <div className="members__list">
                <p>USERS</p>
                {
                    members.map((member) => (
                        <div key={member.user.uid + member.user.status} className={(member.user.status == "online")? "active":"inactive"}>
                            <Avatar src={member.user.photo} />
                            <p>{member.user.displayName}</p>
                        </div>
                    ))
                }
            </div>
            {/* <div className="members__list"> */}
                {/* <p>OFFLINE</p> */}
            {/* </div> */}
        </div>
    )
}

export default Members
