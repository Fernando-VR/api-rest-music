const createError = require('http-errors');
const debug = require('debug')('app:module-album-controller');

const { AlbumService } = require('../services/album_services');
const { Response } = require('../common/response');

module.exports.AlbumController = {
    getAlbums: (req, res) => {
        let result = AlbumService.getAlbums();
        result
            .then( albums => {
                Response.success(res, 200, 'Album list', albums);
            } )
            .catch( error => {
                debug( error );
                Response.error(res);
            });
    },
    getAlbum: (req, res) => {
        let { params : { id } } = req;
        let result = AlbumService.getById( id );
        result
            .then( album => {
                Response.success(res, 200, 'Album', album);
            })
            .catch( error => {
                debug( error );
                Response.error(res, error);
            });
    },
    createAlbum: (req, res) => {
        let { body } = req;
        let { title, label, gender, year } = body;
        const { error, value } = AlbumService.schema.validate({
            title,
            label,
            gender,
            year
        });
        if ( !error ){
            let result = AlbumService.createAlbum( value );
            result
                .then( album => {
                    Response.success(res, 201, 'Album added', album);
                })
                .catch( error => {
                    debug( error );
                    Response.error(res);
                })
        }
        else {
            debug( error );
            Response.errorJoi( res, 400, error );
        }
    },
    updateAlbum: (req, res) => {
        const { body } = req;
        const { title, label, gender, year } = body;
        const { params : { id } } = req;
        const { error, value } = AlbumService.schema.validate({
            title,
            label,
            gender,
            year
        });
        if ( !error ) {
            let result = AlbumService.updateAlbum( id, value );
            result
                .then( album => {
                    album 
                        ? Response.success(res, 200, 'Album modified', album)
                        : Response.error(res, new createError.NotFound());
                })
                .catch( error => {
                    debug(error);
                    Response.error(res, error);
                })
        }
        else {
            debug( error );
            Response.errorJoi(res, 400, error);
        }
    },
    deleteAlbum: (req, res) => {
        const { params : { id }} = req;
        const result = AlbumService.deleteAlbum( id );
        result
            .then( album => {
                Response.success(res, 200, 'Album deleted', album)
            })
            .catch( error => {
                debug( error );
                Response.error(res, error);
            });
    }
}