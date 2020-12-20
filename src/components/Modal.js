import React from 'react'
import './Modal.css'
function Modal({displayState, displayHook, content}) {
    return (
        <div className="modal" style={{display: displayState}}>
            <div className="modal__content">
                <span type="button" className="modal__close" onClick={()=>{displayHook("none")}}>╳</span>
                { content }
            </div>
        </div>
    )
}

export default Modal