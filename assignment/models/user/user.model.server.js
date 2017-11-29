webdev/assignment/models/user/user.model.server.js
module.exports = function() {

    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
        User.create(user);
    }

    function findUserById(userId) {
        return User.find({_id: userId});
    }

    function findUserByCredentials(username, password) {}
        return User.findOne({username:username, password:password});

    function findUserByUsername() {
        return User.findOne({username: username});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }
};