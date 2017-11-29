user.controller.client.js
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
    {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
    {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
    {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"},
    ];

    function ProfileController($routeParams) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;
        var index = -1;
        for(var i in users) {
            if(user[i]._id == id){
                vm.user = users[i];
                index = i;
            }
        }

        function updateUser(newUser) {
            console.log(newUser);
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
        }
    }

    function LoginController($location) {
        var vm = this;

        vm.login = function(username, password) {
            var currentUser = null;
            for(var i in users) {
                if(users[i].username == username && user[i].password == password) {
                    currentUser = users[i];
                    $location.url("/profile/"+users[i]._id);
                    break;
                }else{
                    vm.error = "User not found";
                }
            }
        }
    }
})();