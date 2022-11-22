const { getUsers, users } = require('./getUsers');
const { getRooms, rooms } = require('./getRooms');
const { writeFile, readFileSync, writeFileSync } = require("fs");
const path = require('path')

//Socket connection
function socket(io) {
    io.on('connection', (socket) => {

        socket.on('joined-user', (data) => {
            //Storing users connected in a room in memory
            var user = {};
            user[socket.id] = data.username;
            if (users[data.roomname]) {
                users[data.roomname].push(user);
            }
            else {
                users[data.roomname] = [user];
            }

            //Joining the Socket Room
            socket.join(data.roomname);

            //Emitting New Username to Clients
            io.to(data.roomname).emit('joined-user', { username: data.username });

            //Send online users array
            io.to(data.roomname).emit('online-users', getUsers(users[data.roomname]));

            io.emit('active-rooms', getRooms(io));
        })

        //Emitting messages to Clients
        socket.on('chat', (data) => {
            io.to(data.roomname).emit('chat', { username: data.username, message: data.message });
        })

        //Receiving and sending files to clients
        socket.on("upload", (data) => {
            const file = data.file;
            const filePath = path.join(__dirname, "upload/chat.pdf");
            writeFile(filePath, file, (err) => {
                if (err) {
                    console.log("File Upload failed")
                } else {
                    console.log("File Upload Success!")
                }
            });
            io.to(data.roomname).emit('chat', { username: data.username, message: filePath });
        });

        //Broadcasting the user who is typing
        socket.on('typing', (data) => {
            socket.broadcast.to(data.roomname).emit('typing', data.username)
        })

        //Remove user from memory when they disconnect
        socket.on('disconnecting', () => {
            var rooms = Array.from(socket.rooms.values());
            var socketId = rooms[0];
            var roomname = rooms[1];
            try {
                users[roomname].forEach((user, index) => {
                    if (user[socketId]) {
                        users[roomname].splice(index, 1)
                    }
                });

                //Send online users array
                io.to(roomname).emit('online-users', getUsers(users[roomname]))
            } catch {

            }
        })
    })
}

module.exports = socket;