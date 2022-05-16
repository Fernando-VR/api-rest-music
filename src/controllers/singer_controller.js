const createError = require('http-errors');
const debug = require('debug')('app:module-singer-controller');

const { SingerService } = require('../services/singer_services');
const { Response } = require('../common/response');

module.exports.SingerController = {
    getSingers: (req, res) => {
        let result = SingerService.getSingers();
        result
            .then( singers => {
                Response.success(res, 200, 'Singer list', singers);
            } )
            .catch( error => {
                debug( error );
                Response.error(res);
            });
    },
    getSinger: (req, res) => {
        let { params : { id } } = req;
        let result = SingerService.getById( id );
        result
            .then( singer => {
                singer[0] 
                    ? Response.success(res, 200, 'Singer', singer)
                    : Response.error(res, new createError.NotFound());
            })
            .catch( error => {
                debug( error );
                Response.error(res);
            });
    },
    createSinger: (req, res) => {
        let { body } = req;
        let { artistic_name, real_name, nationality } = body;
        const { error, value } = SingerService.schema.validate({
            artistic_name,
            real_name,
            nationality
        });
        if ( !error ){
            let result = SingerService.createSinger( value );
            result
                .then( singer => {
                    Response.success(res, 201, 'Singer added', singer);
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
    updateSinger: (req, res) => {
        const { body } = req;
        const { artistic_name, real_name, nationality } = body;
        const { params : { id } } = req;
        const { error, value } = SingerService.schema.validate({
            artistic_name,
            real_name,
            nationality
        });
        if ( !error ) {
            let result = SingerService.updateSinger( id, value );
            result
                .then( singer => {
                    singer 
                        ? Response.success(res, 200, 'Singer modified', singer)
                        : Response.error(res, new createError.NotFound());
                })
                .catch( error => {
                    debug(error);
                    Response.error(res);
                })
        }
        else {
            debug( error );
            Response.errorJoi(res, 400, error);
        }
    },
    deleteSinger: (req, res) => {
        const { params : { id }} = req;
        const result = SingerService.deleteSinger( id );
        result
            .then( singer => {
                singer
                    ? Response.success(res, 200, 'Singer deleted', singer)
                    : Response.error(res, new createError.NotFound);
            })
            .catch( error => {
                debug( error );
                Response.error(res);
            });
    }
}