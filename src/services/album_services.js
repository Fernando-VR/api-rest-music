const Album = require('../models/album_model');
const Joi = require('joi');
const debug = require('debug')('app:module-album-services');
const createError = require('http-errors');

const schema = Joi.object({
    title: Joi.string()
            .min(3)
            .max(45)
            .required(),
    label: Joi.string()
            .required(),
    gender: Joi.string()
                .required(),
    year: Joi.number()
            .integer()
            .required()
});

const getAlbums = async () => {
    let albums = await Album.find();
    return albums;
};

const getById = async ( id ) => {
    let album = await Album.find( { "_id": id });
    if ( !album[0] )
        throw new createError(400, `Album ${id} doesn't exist`);
    return album;
};

const createAlbum = async ( { title, label, gender, year } ) => {
    let album = new Album({
        title,
        label,
        gender,
        year
    });
    return await album.save();
};

const updateAlbum = async ( id, { title, label, gender, year } ) => {
    let album = await Album.findOneAndUpdate({ "_id" : id }, {
        $set: {
            title,
            label,
            gender,
            year
        }
    }, { new: true });
    if ( !album )
        throw new createError(400, `Album ${id} doesn't exist`);
    return album;
}

const deleteAlbum = async ( id ) => {
    let album = await Album.findOneAndDelete({ "_id" : id });
    if ( !album )
        throw new createError(400, `Album ${id} doesn't exist`);
    return album;
}

module.exports.AlbumService = {
    getAlbums,
    getById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    schema
};