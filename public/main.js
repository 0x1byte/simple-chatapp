var messages = document.getElementById('messages');
var btn = document.querySelector('.btn');
var userinput = document.getElementById('user-message');

userinput.focus();

const socket = io();

socket.on('message',message => {
    const div = document.createElement('div');
    div.classList.add('message');
    const namediv = document.createElement('div');
    div.classList.add('user-name');
    const messagediv = document.createElement('div');
    div.classList.add('user-message');
    namediv.innerHTML = `${message.user}`;
    messagediv.innerHTML = message.message;
    div.appendChild(namediv);
    div.appendChild(messagediv);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});


userinput.addEventListener('keyup',(e) => {
    if(e.altKey && e.key=='Enter'){
        if (userinput.value.includes('id')) {
            const username = userinput.value.split(':')[1].trim();
            socket.emit('id',username);
            alert('آیدی شما با موفقیت تنظیم شد!');
        }else{
            socket.emit('newMsg',userinput.value);
        }
        userinput.value = ''
        userinput.focus();
    }
});

btn.addEventListener('click', () =>{
    if (userinput.value.includes('id')) {
        const username = userinput.value.split(':')[1].trim();
        socket.emit('id',username);
        alert('آیدی شما با موفقیت تنظیم شد!');
    }else{
        socket.emit('newMsg',userinput.value);
    }
    userinput.value = ''
    userinput.focus();
});