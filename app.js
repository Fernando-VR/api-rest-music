const express = require('express');
const cors = require('cors');
const debug = require('debug')('app:server');

const { IndexAPI, NotFoundAPI } = require('./src/index/index');
const { ConnectionDb } = require('./src/database/index');
const { SongAPI } = require('./src/routes/song');
const { AlbumAPI } = require('./src/routes/album');
const { SingerAPI } = require('./src/routes/singer');
const { RegisterSongAPI } = require('./src/routes/register-song');
const { RegisterAlbumAPI } = require('./src/routes/register-album');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

IndexAPI( app );
ConnectionDb( app );
SongAPI( app );
AlbumAPI( app );
SingerAPI( app );

RegisterSongAPI( app );
RegisterAlbumAPI( app );

NotFoundAPI( app );

const port = process.env.PORT || 3000;

app.listen(port, () => {
    debug(`API REST OK & Listening in port ${port}`);
});