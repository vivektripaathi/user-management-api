const Joi = require('joi');

module.exports = {
    createUser : (userObj) => {
        const schema = Joi.object({
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(8).required(),
            name: Joi.string().required(),
        });
        return schema.validate(userObj);
    },
    updateUser: (userObj) => {
        const schema = Joi.object({
            param_id : Joi.string().required(),
            id : Joi.ref('param_id'),
            email: Joi.string().email().lowercase(),
            password: Joi.string().min(8),
            name: Joi.string(),
            version: Joi.number(),
        });
        return schema.validate(userObj);
    }
}