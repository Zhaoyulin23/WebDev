user.service.server.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {
/*    var users = [
        {_id: "123", username: "alice", password: "alice"},
        {_id: "234", username: "bob", password: "bob"},
        {_id: "345", username: "charley", password: "charley"}
    ];
*/
    app.post("/api/user", creatUser);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    //app.post("/api/login", passport.authenticate('local'), login);
    app.get("/api/user/:username/:password", getUsers);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    //Cookie
    passport.use('local', new LocalStrategy(localStragety));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function (err) {
                    done(err);
                }
            );
    }

    //Cookie Login, Logout, loggedIn, serialize, deserialize
/*
    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res) {
        if(authenticated()) {
            res.json(req.user);
        }else{
            res.send('0');
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
*/

/*    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user){
                        res.status(400).send("username alreday in use");
                        return;
                    }else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err){
                            if(err){
                                req.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        })
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
*/

    function login(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {

                    console.log(req.session);
                    req.session.currentUser = user;

                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteUser(req, res){
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
        //for(var i in users) {
        //    if (users[i]._id == id) {
        //        users.splice(i, 1);
        //        res.send(200);
        //        return;
        //    }
        //}
        //res.send(400);
    }

    function updateUser(req, res) {
        var id = req.params.userId;

        userModel
            .updateUser(id, newUser)
            .then(
                function(response) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        //var newUser = req.body;
        //for(var i in users) {
        //    if (users[i]._id == id) {
        //        users[i].firstName = newUser.firstName;
        //        users[i].lastName = newUser.lastName;
        //        res.send(200);
        //        return;
        //    }
        //    res.send(400);
    }

    function createUser(username, password) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(response) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        //user._id = (new Date()).getTime()+"";
        //users.push(user);
        //console.log(users);
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        console.log(req.session.currentUser);

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(){
                    res.statusCode(404).send(error);
                }
            );
        //for(var i in users) {
        //  if (users[i]._id == id) {
        //        res.send(users[i]);
        //       return;
        //    }
        //}
        //res.send({});
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByUsername(username, res);
        } else if(username && password){
            findUserByCrendentials(username, password, req, res);
        } else {
            res.send(users);
        }
        res.send(users);
    }

    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){

                    console.log(req.session);
                    req.session.currentUser = user;

                    res.json(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
        //for(var i in users) {
        //    if (users[i].username == username && users[i].passwrod == password) {
        //        res.send(users[i]);
        //        return;
        //    }
        //}
        //res.send({});
    }
};