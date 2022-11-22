const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const { User, Room } = require('../models/model.js');

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
        User.create(data, (err, user) => {
            if (err) {
                socket.emit("sign_up_confirmation", { error: 'something went wrong, try again!'});
            }
            console.log(user);
            socket.emit("sign_up_confirmation", { success: 'you successfully created an account!'});
        })
    });

    socket.on("log_in", (data) => {
        User.findOne(data, (err, user) => {
            if (err) {
                socket.emit("log_in_confirmation", { error: 'something went wrong, try again!'});
            }
            if (user === null) {
                socket.emit("log_in_confirmation", { error: 'invalid login information, try again!'});
            }
            socket.emit("log_in_confirmation", { success: 'you logged in successfully!'});
        })
    })

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data) => {
        console.log('backend', data);
        Room.findOneAndUpdate({ roomNumber: data.room },  
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
                socket.emit("send_message_confirmation", messages);
                
            })
        socket.to(data.room).emit("receive_message", data);
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