const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const { SuperUser, User, Room } = require('../models/model.js');

const app = express();
const port = 3001;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML = path.join(DIST_DIR, 'index.html');
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.static(DIST_DIR));

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sign_up", (data) => {
        console.log(data);
        const {username, email, password} = data;
        User.create({username, email, password, favorites: []}, (err, user) => {
            if (err) {
                socket.emit("sign_up_confirmation", { error: 'something went wrong, try again!'});
            } else {
                socket.emit("sign_up_confirmation", { success: 'you successfully created an account!'});
            }
            
        })
    });

    socket.on("log_in", (data) => {
        User.findOne(data, (err, user) => {
            if (err) {
                socket.emit("log_in_confirmation", { error: 'something went wrong, try again!'});
            }
            if (user === null) {
                socket.emit("log_in_confirmation", { error: 'invalid login information, try again!'});
            } else {
                socket.emit("log_in_confirmation", { success: 'you logged in successfully!', name: user.username, email: user.email});
            }
        })
    })

    socket.on("super_log_in", (data) => {
        SuperUser.findOne(data, (err, user) => {
            if (err) {
                socket.emit("super_log_in_confirmation", { error: 'something went wrong, try again!'});
            }
            if (user === null) {
                socket.emit("super_log_in_confirmation", { error: 'invalid login information, try again!'});
            } else {
                socket.emit("super_log_in_confirmation", { success: 'you logged in successfully!', name: user.username, email: user.email, room: user.room});
            }
        })
    })

    socket.on("request_rooms", (data) => {
        Room.find({}, (err, data) => {
            socket.emit("load_rooms", data);
        })
    })

    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log(`User with ID: ${socket.id} joined room ${data.room}`);
        socket.emit("join_room_confirmation", {
            success: `you joined room ${data.room} successfully`,
            selectedRoom: data.room
        })
    })

    socket.on("load_messages", (data) => {
        Room.findOne({ room: data.room },
            (err, messages) => {
                if (err) {
                    socket.emit("load_messages_confirmation", { error: 'something went wrong, try again!'});
                }
                console.log(messages);
                io.to(data.room).emit("load_messages_confirmation", messages);
            })
    })

    socket.on("send_message", (data) => {
        console.log('backend', data);
        Room.findOneAndUpdate({ room: data.room },  
            { $push: 
                { messages: 
                    {message: data.message, 
                        user: data.user 
                    } 
                }
            }, 
            {new: true},
            (err, messages) => {
                if (err) {
                    socket.emit("send_message_confirmation", { error: 'something went wrong, try again!'});
                }
                console.log(messages);
                console.log('data.room', data.room);
                io.to(data.room).emit("send_message_confirmation", messages);
                
            })
    })

    socket.on("request_favorites", (data) => {
        User.findOne({email: data.email}, (err, user) => {
            socket.emit("load_favorites", user);
        })
    })

    socket.on("super_request_favorites", (data) => {
        SuperUser.findOne({email: data.email}, (err, user) => {
            socket.emit("load_favorites", user);
        })
    })

    socket.on("add_to_favorites", (data) => {
        console.log(data.email);
        User.findOne({ email: data.email }, (data) => {
            console.log('findone', data);
        })
        User.findOneAndUpdate(
            { email: data.email },
            { $push: 
                {favorites: { room: data.room }}
            }, 
            {new: true}, 
            (err, user) => {
                console.log(user);
                socket.emit("add_to_favorites_confirmation", user);
            })
    })

    socket.on("remove_from_favorites", (data) => {
        User.findOneAndUpdate(
            {email: data.email},
            { $pull: 
                {favorites: { room: data.room }}
            }, 
            {new: true}, 
            (err, user) => {
                console.log(user);
                socket.emit("remove_from_favorites_confirmation", user);
            })
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    })
});

// app.use('/signup', signUpRouter);

// app.use('/login', logInRouter);

// app.get('/', (req, res) => {
// res.status(200).sendFile(HTML);;
// });

// app.use((err, req, res, next) => {
//     const defaultErr = {
//         log: 'Express error handler caught unknown middleware error',
//         status: 400,
//         message: { err: 'An error occurred' },
//       };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
// })
server.listen(port, function () {
console.log('App listening on port: ' + port);
});