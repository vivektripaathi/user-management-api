const Services = require('../services')
const Validations = require('../validations');

module.exports = {

    register: async(req, res, next) => {
        const { error } = Validations.user.createUser(req.body);
        if(error) return next(error);
        try {
            const newUser = await Services.userServices.createUser(req.body)
            if(newUser){
                const token = await Services.userServices.createAuthToken(newUser);
                if (token) res.json({newUser, token});
            } 
            else return next( {name : 'Duplicate Value', message : 'User email already exists'} );
        } catch (err) {
            return next(err);
        }
    },

    getAllUsers : async(req, res, next) => {
        try {
            const users = await Services.userServices.getAllUsers();
            if(users) res.json(users);
            else return next(err)
        } catch (err) {
            return next(err);
        }
    },

    getUser: async(req, res, next) => {
        const { id } = req.params;
        try{
            const user = await Services.userServices.getUser(id);
            if(user) res.json(user);
            else return next( { name : 'Not Found', message : 'User not found'} );
        }
        catch (err) {
            return next(err);
        }
    },

    updateUser : async(req, res, next) => {
        const param_id = req.params.id;
        const reqBody = req.body;
        // constructing obj to send for validation purposes
        reqBody.param_id = param_id;
        const { error } = await Validations.user.updateUser(reqBody);
        if(error) return next(error);
        const updatedUser = await Services.userServices.updateUser(param_id, req.body)
        if(updatedUser.error) return next(updatedUser.error); 
        res.json(`${updatedUser} user updated successfully`);
    },

    deleteUser : async(req, res, next) => {
        const { id } = req.params;
        try {
            const deleteduser = await Services.userServices.deleteUser(id);
            if(!deleteduser) return next( { name : 'Not Found', message : 'User not found'} );
            res.json(deleteduser);
        } catch (err) {
            return next(err);
        }
    },


}
