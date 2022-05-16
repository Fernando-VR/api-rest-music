const express = require('express');
const { RegisterSongController } = require('../controllers/register-song_controller');

const router = express.Router();

module.exports.RegisterSongAPI = (app) => {
    router
        .get('/', RegisterSongController.getTest)
        .post('/:id_album/:id_song', RegisterSongController.addSong)
        .delete('/:id_album/:id_song', RegisterSongController.removeSong)
    app.use('/api/register-songs', router);
}