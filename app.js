require('dotenv').config();
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./db/prismaClient');
const passport = require('./config/passport');
const flash = require('connect-flash');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const PORT = process.env.PORT;
const app = express();

// set templating language to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware
app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        },
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Middleware to expose flash messages to all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!'); // Send a generic error message
});

// set currentUser according to login user
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// routes
app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
