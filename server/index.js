const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}}) // Restrigindo para receber requisições só do link

const PORT = 3001

io.on('connection', socket => {
    console.log('Usuário conectado!', socket.id);

    socket.on('disconnect', reason => {
        console.log('user desconectado!', socket.id)
    })

    socket.on('set_username', username => {
        socket.data.username = username;
        console.log(socket.data.username)
    });

    socket.on('message', text => {
        
    })
})

server.listen(PORT, ()=> console.log('server running in http://localhost:3001'))
