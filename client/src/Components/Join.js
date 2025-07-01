import React ,{useState}from 'react'
import {Link} from 'react-router-dom'

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
  return (
    <div className='container'>
        <div className='container'>
            <h1 className='text-bold'> Join</h1>
            <div className='container'>
                <input type='text' placeholder='Name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
                <input type='text' placeholder='Room' className='form-control' onChange={(e)=>setRoom(e.target.value)}/>
                <Link onClick={event => { if (!name || !room) event.preventDefault(); }} to={`/chat?name=${name}&room=${room}`}>
                <button className='btn btn-primary' type="submit">SignIn</button>
                </Link>
                
                
               
            </div>
        </div>
     
    </div>
  )
}

export default Join
