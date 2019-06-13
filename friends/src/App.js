import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import {Route} from 'react-router-dom';
import AddFriendForm from './components/form';
import Friend from './components/Friend';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      friend: '',
      age: '',
      friendEmail: '',
      friendInfo: {
        id: '',
        name: '',
        age: '',
        email: ''
     }
    };
  }

    //fetching data from server, saying hi!
  componentDidMount(){
    axios
    .get('http://localhost:5000/friends')
    .then( response => {
      this.setState(() => ({ friends: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
    
  };

    //allows input fields to edit state
    friendInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


      //function being passed down to add friend, and re-render the new server data after sending that data to the server!
  addFriend = event => {
    if(!this.state.friend || !this.state.age  || !this.state.friendEmail || isNaN(this.state.age) || !isNaN(this.state.friend) || !isNaN(this.state.friendEmail)){
      return console.log('Input correct info in fields');
    }
    var idNum= this.state.friends.length + 1;
    event.preventDefault();
    const newFriend = {
        id: idNum,
        name: this.state.friend,
        age: this.state.age,
        email: this.state.friendEmail,
    };
    axios
      .post('http://localhost:5000/friends', newFriend)
      .then(response => {
        this.setState({
          friends: response.data,
          friend: '',
          age: '',
          friendEmail: '',
        });
        console.log(this.state.friends);
      })
      .catch(err => console.log(err));
  };


    //allows us to delete a friend based on either email or name
  removeFriend = e => {
    for(let i=0; i < this.state.friends.length; i ++) {
      if(this.state.friends[i].name.toLowerCase() === this.state.friend || this.state.friends[i].email === this.state.friendEmail) {
        axios     
        .delete(`http://localhost:5000/friends/${this.state.friends[i].id}`)
           .then(response => {
             this.setState({
               friends: response.data,
               friend: '',
               age: '',
               friendEmail: '',
             });
             console.log(this.state.friends);
           })
           .catch(err => {
             console.log('Error,', err)
           });
      }
    }
    
  };
    //Allows us to change friend info based on data in the input
  updateFriend = e => {
    var newFriend= {
      id: parseInt(e.target.id),
      name: this.state.friend === '' ? this.state.friends[e.target.id - 1].name : this.state.friend,
      age: this.state.age === '' ? this.state.friends[e.target.id - 1].age : this.state.age,
      email: this.state.friendEmail === '' ? this.state.friends[e.target.id - 1].email : this.state.friendEmail,
    };
    axios
    .put(`http://localhost:5000/friends/${e.target.id}`, newFriend)
    .then(response => {
      this.setState({
        friends: response.data,
        friend: '',
        age: '',
        friendEmail: '',
      });
      console.log(this.state.friends);
    })
  };



  

  render() {
    return (
      <div className="app">
          <div className="friend-list">
            {this.state.friends.map(friendy => {
                return <Friend key={friendy.id} id={friendy.id} friend={friendy} updateFriend={this.updateFriend}/>
            })}
        </div> 
        <AddFriendForm 
        friend={this.state.friend}
        age={this.state.age}
        friendEmail={this.state.friendEmail}
        friendInput={this.friendInput}
        addFriend={this.addFriend}
        removeFriend = {this.removeFriend}
        />
      </div>
        
    );
  }
};