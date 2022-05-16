const express = require('express');
const { SongController } = require('../controllers/song_controller');

const router = express.Router();

module.exports.SongAPI = (app) => {
    router
        .get('/', SongController.getSongs)
        .get('/:id', SongController.getSong)
        .post('/', SongController.createSong)
        .put('/:id', SongController.updateSong)
        .delete('/:id', SongController.deleteSong)
    app.use('/api/songs', router);
}