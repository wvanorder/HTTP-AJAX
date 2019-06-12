import React from 'react'

const Friend = props => {
    return(
        <div>
            <h2>{props.friend.name}</h2>
            <h3>{props.friend.age}</h3>
            <h3>{props.friend.email}</h3>
            <button id={parseInt(props.id)} onClick={props.updateFriend}>Update Info</button>
        </div>
        
    )
}


export default Friend;