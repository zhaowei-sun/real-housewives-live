const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML = path.join(DIST_DIR, 'index.html');
const bodyParser = require('body-parser')

const signUpRouter = require('../routes/signUpRouter.js');
const logInRouter = require('../routes/logInRouter.js');

app.use(express.static(DIST_DIR));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/signup', signUpRouter);

app.use('/login', logInRouter);

app.get('/', (req, res) => {
res.status(200).sendFile(HTML);;
});

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
      };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})
app.listen(port, function () {
console.log('App listening on port: ' + port);
});