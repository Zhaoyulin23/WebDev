user.service.client.js
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
        {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
        {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"}
    ];

    function UserService($http) {
        var api = {
            createUser: createUser,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function login(username, password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function loggedIn(){
            return $http.get("/api/loggedIn");
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function register(req, res) {
            var username = req.body.username;
            var password = req.body.password;

            userModel
                .findUserByUsername(username)
                .then(
                    function(user) {
                        if(user) {
                            res.status(400).send("Username already in use");
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }

        //TODO
        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function findUserByUsernameAndPassword() {
            var url = "/api/user?username="+username+"&password="+password;
            for (var i in users) {
                if (users[i].username == username && user[i].password == password) {
                    return users[i];
                }
                return null;
                //return $http.get(url);
            }
        }

        function findUserById(id) {
            //var url = "/api/user" +id;
            for (var i in users) {
                if (users[i]._id == id) {
                    return users[i];
                }
                return null;
            }
        }


        function updateUser(id, newUser) {
            /*UserService.updateUser(id, newUser);*/
            var url = "/api/user" + id;
            return $http.put(url, newUser);

            for (var i in users) {
                if (users[i]._id == id) {
                    //console.log(newUser);
                    users[index].firstName = newUser.firstName;
                    users[index].lastName = newUser.lastName;
                    return true;
                }
            }
        }

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser);
                then(
                    function(response){
                        vm.seccess = "Updated success"
                    },
                    function(error){
                        vm.error = "unable to update user"
                    }
                )
        }
        //TODO
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();