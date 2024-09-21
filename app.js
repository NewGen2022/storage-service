require('dotenv').config();
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT;

const app = express();

// set templating language to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
