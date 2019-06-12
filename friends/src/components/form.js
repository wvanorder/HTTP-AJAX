import React from 'react'

const AddFriendForm = props => {
    return(
        <div>
            <form>
                <input placeholder="Friend Name"
                onChange={props.friendInput}
                value={props.friend}
                name="friend"
                required = 'Fill Me out'
                />
                <input placeholder ='email'
                onChange={props.friendInput}
                value={props.friendEmail}
                name="friendEmail"
                required = 'Fill Me out'
                />
                <input placeholder ='age'
                onChange={props.friendInput}
                value={props.age}
                name="age"
                required = 'Fill Me out'
                />
                {/* {props.error && <p>{props.error}</p>} */}
            </form>
            <button onClick={props.addFriend}>Add Friend</button>
            <button onClick={props.removeFriend}>Remove Friend</button>
            
        </div>
        
    )
}


export default AddFriendForm;