const express = require('express');
const { SingerController } = require('../controllers/singer_controller');

const router = express.Router();

module.exports.SingerAPI = (app) => {
    router
        .get('/', SingerController.getSingers)
        .get('/:id', SingerController.getSinger)
        .post('/', SingerController.createSinger)
        .put('/:id', SingerController.updateSinger)
        .delete('/:id', SingerController.deleteSinger)
    app.use('/api/singers', router);
}