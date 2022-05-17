const createError = require('http-errors');
const debug = require('debug')('app:module-register-album-controller');

const { RegisterAlbumService } = require('../services/register-album_service');
const { Response } = require('../common/response');

module.exports.RegisterAlbumController = {
    getTest: (req, res) => {
        let { params : { id_singer }} = req;
        let result = RegisterAlbumService.getAlbumsSinger( id_singer );
        result
            .then( albums => {
                Response.success(res, 201, `Singer's ${id_singer} Albums`, albums);
            })
            .catch( error => {
                debug(error);
                Response.error(res, error);
            })
    },
    addAlbum: (req, res) => {
        let { params: { id_singer, id_album } } = req;
        let result = RegisterAlbumService.registerAlbum( id_singer, id_album );
        result
            .then( singer => {
                Response.success(res, 201, 'Album added to singer', singer);
            })
            .catch( error => {
                debug( error );
                Response.error(res, error);
            })
    },
    removeAlbum: (req, res) => {
        let { params: { id_singer, id_album } } = req;
        let result = RegisterAlbumService.removeAlbum( id_singer, id_album );
        result
            .then( singer => {
                Response.success(res, 201, 'Album removed to singer', singer);
            })
            .catch( error => {
                debug( error );
                Response.error(res, error);
            })
    }
}