import React from 'react'
import '../App.scss'

const Friend = props => {
    return(
        <div className="friend-card">
            <h2>{props.friend.name}</h2>
            <h3>{props.friend.age}</h3>
            <h3>{props.friend.email}</h3>
            <button id={parseInt(props.id)} onClick={props.updateFriend}>Update Info</button>
        </div>
        
    )
}


export default Friend;