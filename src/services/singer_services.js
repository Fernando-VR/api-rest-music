const Singer = require('../models/singer_model');
const Joi = require('joi');
const createError = require('http-errors');
const debug = require('debug')('app:module-singer-services');

const schema = Joi.object({
    artistic_name: Joi.string()
                    .required(),
    real_name: Joi.string()
                .required(),
    nationality: Joi.string()
                    .required()
});

const getSingers = async () => {
    let singers = await Singer.find();
    return singers;
};

const getById = async ( id ) => {
    let singer = await Singer.find( { "_id": id });
    if ( !singer[0] )
        throw new createError(400, `Singer ${id} doesn't exist`);
    return singer;
};

const createSinger = async ( { artistic_name, real_name, nationality } ) => {
    let exist = await existSinger( artistic_name );
    if ( exist )
        throw new createError(400, `Singer ${artistic_name} already exist`);
    let singer = new Singer({
        artistic_name,
        real_name,
        nationality
    });
    return await singer.save();
};

const updateSinger = async ( id, { artistic_name, real_name, nationality } ) => {
    let singer = await Singer.findOneAndUpdate({ "_id" : id }, {
        $set: {
            artistic_name,
            real_name,
            nationality
        }
    }, { new: true });
    if ( !singer )
        throw new createError(400, `Singer ${id} doesn't exist`);
    return singer;
}

const deleteSinger = async ( id ) => {
    let singer = await Singer.findOneAndDelete({ "_id" : id });
    if ( !singer )
        throw new createError(400, `Singer ${id} doesn't exist`);
    return singer;
}

const existSinger = async ( artistic_name ) => {
    let singer = await Singer.find( { "artistic_name" : artistic_name } );
    return singer;
}

module.exports.SingerService = {
    getSingers,
    getById,
    createSinger,
    updateSinger,
    deleteSinger,
    schema
};