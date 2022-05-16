const express = require('express');
const createError = require('http-errors');

const { Response } = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        const menu = {
            singer: `https://${req.headers.host}/api/singers`,
            album: `https://${req.headers.host}/api/albums`,
            song: `https://${req.headers.host}/api/songs`,
            register_song: `https://${req.headers.host}/api/register-songs`
        };
        Response.success(res, 200, 'Library of music API', menu);
    });
    app.use('/', router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();
    router.all('*', (req, res) => {
        Response.error(res, new createError.NotFound());
    });
    app.use('/', router);
}