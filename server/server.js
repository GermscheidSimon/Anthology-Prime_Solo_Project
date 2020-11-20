
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const songRouter = require('./routes/song.router')
const playlistRouter = require('./routes/playlist.router.js');
const { rejectUnauthenticated } = require('./modules/authentication-middleware');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/**
 *  user     :  handles user login/authentication/registration
 *  song     :  handles fetching songs and uploading new songs
 *  playlist :  handles fetching playlists of of songs
 * */
app.use('/api/user', userRouter);
app.use('/api/song', songRouter)
app.use('/api/playlist', playlistRouter)

// Serve static files
app.use(express.static('build'));
// serve protected static files. returns 403 if not signed in. 
// FS_songs will store the music the site will serve. 
app.use(rejectUnauthenticated, express.static( 'server/FS_songs')) 

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
