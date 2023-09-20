const path = require('path');
const Dao = require('../dao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: path.join(__dirname , '../../', '.env')});

module.exports = {
    createUser: async (userObj) => {
        try {
            // Check if user with the same email already exists
            const existingUser = await Dao.userDao.getUserByEmail(userObj.email);
            if (existingUser) return false;

            // hash new user's password 
            const hashedPassword = await bcrypt.hash(userObj.password, 10);

            const newUser = await Dao.userDao.createUser({
                ...userObj,
                password: hashedPassword
            });
            newUser.password = undefined;
            return newUser;
        }catch (err) {
            if(err.name === 'SequelizeDatabaseError') return false;
            else throw new Error('Failed to register user');
        }
    },
    getAllUsers: async()=>{
        try {
            const users = await Dao.userDao.getAllUsers();
            if (!users) return false; // TO check this error delete all users --> have to check at least one
            return users;
        } catch (err) {
            if(err.name === 'SequelizeDatabaseError') return false;
            else throw new Error('Failed to get all users');
        }
    },
    getUser: async (userId) => {
        try{
            const user = await Dao.userDao.getUserById(userId);
            if (!user) return false;
            return user;
        }
        catch (err) {
            if(err.name === 'SequelizeDatabaseError') return false;
            else throw new Error('Failed to get user');
        }
    },

    deleteUser: async (userId) => {
        try {
            // check if user with this id exists
            const user = await Dao.userDao.getUserById(userId);
            if(!user) return false;
            const deleteCount = await Dao.userDao.deleteUserById(userId);
            return { 'deletedUserEmail' : user.email, 'deleteCount' : deleteCount};
        } catch (err) {
            if(err.name === 'SequelizeDatabaseError') return false;
            else throw new Error('Failed to delete user');
        }
    },

    createAuthToken : async (userObj, tokenExpiry = '60d') => {
        const secret = process.env.SECRET;
        try {
            const token = jwt.sign({userId : userObj.id}, secret, {expiresIn : tokenExpiry});
            return token;
        } catch (err) {
            throw new Error('Failed to create auth token');
        }
    },

    updateUser : async (userId, newUpdate) => {
        try {
            // check if user with this id exists
            const user = await Dao.userDao.getUserById(userId);
            if(!user) return {error: {name : 'Not Found', message : 'User not found'}}
            // Check if the provided version matches the current user's version
            if(newUpdate.version !== user.version) return {error: { status : 400, message : 'Conflict. User data has been updated by another request.'}}
            const updatedUserCount = await Dao.userDao.updateUserById(userId, newUpdate);
            
            return updatedUserCount;
        } catch (err) {
            if(err.name === 'SequelizeDatabaseError') return {error: {name : 'Not Found', message : 'User not found'}};
            // else throw new Error('Failed to get user');
            else return {error: err};
        }
    }
}