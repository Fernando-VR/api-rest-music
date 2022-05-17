const Album = require('../models/album_model');
const Singer = require('../models/singer_model');
const createError = require('http-errors');
const debug = require('debug')('app:module-register-album-services');

const getAlbumsSinger = async ( id_singer ) => {
    let singer = await Singer.findOne( { "_id" : id_singer });
    if ( !singer )
        throw new createError(400, `Singer ${id_singer} doesn't exist`);
    let albums = await Singer.findById(id_singer).select( { artistic_name:1, albums:1 } );
    return albums;
}

const registerAlbum = async (id_singer, id_album) => {
    let singer = await Singer.findOne( { "_id" : id_singer } );
    let album = await Album.findOne( { "_id": id_album});
    if ( !singer )
        throw new createError(400, `Singer ${id_singer} doesn't exist`);
    if ( !album )
        throw new createError(400, `Album ${id_album} doesn't exist`);
    let result = await Singer.updateOne ( { "_id" : id_singer }, {
        $addToSet: {
            albums: id_album
        }
    })
    if ( !result.modifiedCount )
        throw new createError(400, `Album ${id_album} already exist in singer ${id_singer}`);
    singer = await Singer.findOne( { "_id" : id_singer } );
    return singer;
}

const removeAlbum = async (id_singer, id_album) => {
    let singer = await Singer.findOne( { "_id" : id_singer } );
    let album = await Album.findOne( { "_id": id_album});
    if ( !singer )
        throw new createError(400, `Singer ${id_singer} doesn't exist`);
    if ( !album )
        throw new createError(400, `Album ${id_album} doesn't exist`);
    let result = await Singer.updateOne ( { "_id" : id_singer }, {
        $pullAll: {
            albums: [ id_album ]
        }
    })
    if ( !result.modifiedCount )
        throw new createError(400, `Album ${id_album} doesn't exist in singer ${id_singer}`);
    return singer;
}

module.exports.RegisterAlbumService = {
    getAlbumsSinger,
    registerAlbum,
    removeAlbum
};