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
  favorites: [{
    room: { type: String },
  }]
});

const User = mongoose.model('user', userSchema);

const roomSchema = new Schema({
  room: { type: String, required: true, unique: true },
  roomFranchise: { type: String, required: true},
  roomName: { type: String, required: true},
  roomIcon: {type: String, required: true},
  messages: [{ 
    message: {type: String},
    user: {type: String},
    username: {type: String},
    super: {type: String}
  }],
});

const Room = mongoose.model('room', roomSchema);

const superUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  room: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{
    room: { type: String },
  }]
})

const SuperUser = mongoose.model('superuser', superUserSchema);

module.exports = {
  User,
  Room,
  SuperUser
};