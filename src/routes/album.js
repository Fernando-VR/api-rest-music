const express = require('express');
const { AlbumController } = require('../controllers/album_controller');

const router = express.Router();

module.exports.AlbumAPI = (app) => {
    router
        .get('/', AlbumController.getAlbums)
        .get('/:id', AlbumController.getAlbum)
        .post('/', AlbumController.createAlbum)
        .put('/:id', AlbumController.updateAlbum)
        .delete('/:id', AlbumController.deleteAlbum)
    app.use('/api/albums', router);
}