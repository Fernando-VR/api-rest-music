const Song = require('../models/song_model');
const Joi = require('joi');
const debug = require('debug')('app:module-song-services');

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
    return song;
}

const deleteSong = async ( id ) => {
    let song = await Song.findOneAndDelete({ "_id" : id });
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