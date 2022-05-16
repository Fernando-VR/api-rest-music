const express = require('express');
const { RegisterAlbumController } = require('../controllers/register-album_controller');

const router = express.Router();

module.exports.RegisterAlbumAPI = (app) => {
    router
        .get('/', RegisterAlbumController.getTest)
        .post('/:id_singer/:id_album', RegisterAlbumController.addAlbum)
        .delete('/:id_singer/:id_album', RegisterAlbumController.removeAlbum) // -->
    app.use('/api/register-albums', router);
}