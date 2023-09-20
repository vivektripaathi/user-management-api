const Controllers = require('../controllers')

module.exports = (router) => {
    router.post('/users', Controllers.user.register);
    router.get('/users', Controllers.user.getAllUsers);
    router.get('/users/:id', Controllers.user.getUser)
    router.put('/users/:id', Controllers.user.updateUser)
    router.delete('/users/:id', Controllers.user.deleteUser)
}