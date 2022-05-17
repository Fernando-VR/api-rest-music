const Song = require('../models/song_model');
const Joi = require('joi');
const debug = require('debug')('app:module-song-services');
const createError = require('http-errors')

const schema = Joi.object({
    title: Joi.string()
            .min(3)
            .max(45)
            .required(),
    track_number: Joi.number()
                    .integer()
                    .required(),
    length: Joi.string()
                .required()
});

const getSongs = async () => {
    let songs = await Song.find();
    return songs;
};

const getById = async ( id ) => {
    let song = await Song.find( { "_id": id });
    if ( !song[0] )
        throw new createError(400, `Song ${id} doesn't exist`);
    return song;
};

const createSong = async ( { title, track_number, length } ) => {
    let song = new Song({
        title,
        track_number,
        length
    });
    return await song.save();
};

const updateSong = async ( id, { title, track_number, length } ) => {
    let song = await Song.findOneAndUpdate({ "_id" : id }, {
        $set: {
            title,
            track_number,
            length
        }
    }, { new: true });
    if ( !song )
        throw new createError(400, `Song ${id} doesn't exist`);
    return song;
}

const deleteSong = async ( id ) => {
    let song = await Song.findOneAndDelete({ "_id" : id });
    if ( !song )
        throw new createError(400, `Song ${id} doesn't exist`);
    return song;
}

module.exports.SongService = {
    getSongs,
    getById,
    createSong,
    updateSong,
    deleteSong,
    schema
};