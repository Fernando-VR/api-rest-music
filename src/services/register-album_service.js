const Album = require('../models/album_model');
const Singer = require('../models/singer_model');
const createError = require('http-errors');
const debug = require('debug')('app:module-register-album-services');

const registerAlbum = async (id_singer, id_album) => {
    let singer = Singer.findOne( { "_id" : id_singer } );
    let album = Album.findOne( { "_id": id_album});
    if ( !album )
        throw new createError(400, `Album ${id_song} doesn't exist`);
    if ( !singer )
        throw new createError(400, `Song ${id_song} doesn't exist`);
    let result = await Singer.updateOne ( { "_id" : id_singer }, {
        $addToSet: {
            albums: id_album
        }
    })
    if ( !result.modifiedCount )
        throw new createError(400, `Album ${id_album} already exist in singer ${id_singer}`);
    return singer;
}

const removeAlbum = async (id_singer, id_album) => {
    let singer = Singer.findOne( { "_id" : id_singer } );
    let album = Album.findOne( { "_id": id_album});
    if ( !album )
        throw new createError(400, `Album ${id_song} doesn't exist`);
    if ( !singer )
        throw new createError(400, `Song ${id_song} doesn't exist`);
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
    registerAlbum,
    removeAlbum
};