const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { fm,adduser,getuser,updateuser,leave } = require('./public/utils')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket => {
    adduser(socket.id,'Guest User');
    socket.emit('message',fm('Chatbot','به چت روم خوش آمدید! جهت تنظیم آیدی به شکل زیر عمل کنید: id:username'));
    socket.broadcast.emit('message',fm('Chatbot','کاربری به چت روم وارد شد!'));

    socket.on('newMsg', (message) => {
        io.emit('message',{user:getuser(socket.id).username,message:message});
    });

    socket.on('disconnect',() => {
        socket.broadcast.emit('message',fm('Chatbot',`${getuser(socket.id).username} چت را ترک کرد!`));
        leave(socket.id);
    });

    socket.on('id',username => {
        updateuser(socket.id,username);
    });
})


server.listen(PORT,()=>{
    console.log(`server started on: ${PORT}`);
})