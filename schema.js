const Joi = require('joi');

module.exports.lisitingschema= Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required()
    }).required()
})