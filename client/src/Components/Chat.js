import React from 'react'
import { useState,useEffect } from 'react'
import queryString from 'query-string'
import {io} from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import UserList from './UserList';


import Messagesto from './Messagesto.js';
 const Endpoint = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001'; // TODO: Replace with your server URL, e.g., 'http://localhost:5000'
let socket;
function Chat() {
    const [name,setName]=useState('')
    const[room,setRoom]=useState('')
    const[messages,setMessages]=useState([])
    const[message,setMessage]=useState('')
    const [users, setUsers] = useState([]);
    const location = useLocation();
    useEffect(()=>{
     const {name,room}=queryString.parse(location.search);
     socket=io(Endpoint,{
        transports: ['websocket', 'polling'],
  withCredentials: true
     });
     console.log(location.search)
     
     setName(name);
     setRoom(room);
     socket.emit('join',{name,room},(error)=>{
        if(error){
            alert(error);
        }
     });

    },[location.search]);
    useEffect(() => {
    socket.on('message', (message) => {
        console.log('Received message:', message); 
        setMessages(prevMessages => [...prevMessages, message]);
    });
    socket.on('roomData', ({ users }) => {
        setUsers(users);
    });

    
    
}, []);

    const sendMessage=(e)=>{
        e.preventDefault();
     if(message){
        socket.emit('sendMessage', message, () => setMessage(''))
     }
    }
return (
     <div className="container mt-5">
        <div className="row">
            <div className="col-md-8">
        <div className="card">
            <Navbar room={room}/>
            <div className="card-body" style={{ height: '300px', overflowY: 'auto' }}>
                <Messagesto messages={messages} name={name}/>
            </div>
            <div className="card-footer">
                <form className="d-flex" >
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Type a message..."
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
      onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
                </form>
            </div>
        </div>
        
    </div>
    <div className="col-md-4">
                <div className="card">
        <div className="card-header">
            <h6 className="mb-0">Users in Room</h6>
        </div>
        <div className="card-body" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <UserList users={users} />
        </div>
    </div>
            </div>
    </div>
    </div>
)
}

export default Chat
