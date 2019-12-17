require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sessionCheck = require('./middlewares/checkForSession');
const sc = require('./controllers/swagController');
const ac = require('./controllers/authController');
const cc = require('./controllers/cartController');
const search = require('./controllers/searchController');

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(sessionCheck);

app.get('/api/swag', sc.read);

app.get('/api/user', ac.getUser);

app.post('/api/login', ac.login);

app.post('/api/register', ac.register);

app.post('/api/signout', ac.signout);

app.get('/api/users', ac.allUsers);

app.post('/api/cart/checkout', cc.checkout);

app.post('/api/cart/:id', cc.add);

app.delete('/api/cart/:id', cc.delete);

app.get('/api/search', search.search);



app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`));