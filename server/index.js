const express =require('express');
const socketio=require('socket.io');
const { adduser, removeuser, getuser, getusersinroom } = require('./Users');
const http=require('http');
const PORT= process.env.PORT || 5001;
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000', // for local development
  'https://real-time-chat-app3.onrender.com' // your Render domain
];
const router=require('./Router');
const app = express();
const server=http.createServer(app);
const io = socketio(server, {
  cors: {
    origin:allowedOrigins , 
    methods: ['GET', 'POST'],
    credentials: true
  }
});
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use('/api', router);

io.on('connect',(socket)=>{
    console.log("we have a connection");
    socket.on('join',({name,room},callback)=>{
        console.log('User has joined!!');
        const {error, user} = adduser({id: socket.id, name, room});
        if (error) {
            return callback(error);
        }

        socket.join(user.room);
        socket.emit('message',{user:'admin',text:`${user.name}, welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` });
        io.to(user.room).emit('roomData',{room:user.room,users:getusersinroom(user.room)});
        callback();
 
    });
    socket.on('sendMessage',(message,callback)=>{
        const user = getuser(socket.id);
        console.log(message);
        if (message) {
            io.to(user.room).emit('message', { user: user.name, text: message });
            // io.to(user.room).emit('roomData', { room: user.room,text:message });
        }
        callback();
    })
    socket.on('disconnect',()=>{
        const user = removeuser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getusersinroom(user.room)});
        }
        console.log('User had left!!');
    })
    
})
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
server.listen(PORT,()=>
{console.log(`Example app listening on port ${PORT}`)});






