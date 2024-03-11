const express = require('express');
const cors = require('cors');
const users = require('./controllers/users');
const login = require('./controllers/login');
const register = require('./controllers/register');
const project = require('./controllers/project');
const issue = require('./controllers/issue');
const tag = require('./controllers/tag')
const comment = require('./controllers/comment')
const cookieParser = require('cookie-parser');


const app = express();// Middlewares
app.use(express.json());// permet llegir contingut json en posts
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));// cors necessari quan api/front son a servidors diferents
app.use(cookieParser());// permet llegir les cookies

// Routes
app.use('/api/', users);
app.use('/api/', login);
app.use('/api/', register);
app.use('/api/', project);
app.use('/api/', issue);
app.use('/api/', tag);
app.use('/api/', comment);

// iniciem servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
