const io = require('socket.io')(https://mechat-4ae1.onrender.com,{
    cors:
    {
       origin: ['http://127.0.0.1:5500'] 
    }
});
    const users = {};  
    io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        //console.log("new user:",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', name =>
    {
            socket.broadcast.emit('leave', users[socket.id] );    
            delete users[socket.id];
    })
    


});

    
