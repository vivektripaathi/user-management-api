const models = require('../models');

module.exports = {
    createUser: async (userObj) => {
        return models.user.create(userObj);
    },
    getAllUsers: async()=>{
        return models.user.findAll({
            attributes: { exclude : ['password']},
        })
    },
    getUserByEmail: async (email) => {
        return models.user.findOne({ 
            where: { email },
            attributes: { exclude: ['password'] },
        });
    },
    getUserById: async(id) => {
        return models.user.findOne({
            where : { id },
            attributes: { exclude: ['password'] },
        });
    },
    deleteUserById: async (id) => {
        return models.user.destroy({
            where : { id }
        });
    },
    updateUserById : async (id, newUpdate) => {
        return models.user.update({email : newUpdate.email, name: newUpdate.name, version: newUpdate.version+1}, { where : { id : id}})
    }
}