const createError = require('http-errors');
const debug = require('debug')('app:module-register-song-controller');

const { RegisterSongService } = require('../services/register-song_service');
const { Response } = require('../common/response');

module.exports.RegisterSongController = {
    getTest: (req, res) => {
        Response.success(res, 200, 'GET register-song');
    },
    addSong: (req, res) => {
        let { params: { id_album, id_song } } = req;
        let result = RegisterSongService.registerSong( id_album, id_song );
        result
            .then( album => {
                Response.success(res, 201, 'Song added to album', album);
            })
            .catch( error => {
                debug( error );
                Response.error(res);
            })
    },
    removeSong: (req, res) => {
        let { params: { id_album, id_song } } = req;
        let result = RegisterSongService.removeSong( id_album, id_song );
        result
            .then( album => {
                Response.success(res, 201, 'Song removed to album', album);
            })
            .catch( error => {
                debug( error );
                Response.error(res);
            })
    }
}