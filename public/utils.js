var users = [];


function fm(username,message){
    return {
        user:username,
        message:message
    };
}

function adduser(id,username){
    const user = {id,username};
    users.push(user);
    return user;
}

function getuser(id){
    return users.find(user => user.id === id);
}

function updateuser(id,username){
    users = users.map((user) => user.id === id ? {...user,username:username}:user);
}


function leave(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}


module.exports = {
    fm,
    adduser,
    getuser,
    updateuser,
    leave
}