const mongoose = require('mongoose');

const URI = 'mongodb+srv://zhaowei-sun:thmagOm5iTKHN9Q2@cluster0.v5qncew.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'chatroom'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('user', userSchema);

const roomSchema = new Schema({
  roomNumber: { type: Number, required: true, unique: true },
  messages: [{ 
    message: {type: String},
    user: {type: String}
  }],
});

const Room = mongoose.model('room', roomSchema);
//Room.create({roomNumber: 1, messages:[]})
module.exports = {
  User,
  Room
};