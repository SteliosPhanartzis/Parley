import React from 'react'
import './Members.css'

function Members() {
    return (
        <div className="members">
            {/* Pull users in specified server / channel from firebase and iterate for each list */}
            <div className="members__list">
                <p>ONLINE</p>
            </div>
            <div className="members__list">
                <p>OFFLINE</p>
            </div>
        </div>
    )
}

export default Members
