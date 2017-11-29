login.controller.client.js
/*    function LoginController($scope) {
        $scope.hello="Hello from login controller";
    }
*/


(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

/* MOVE THIS TO PROFILE.CONTROLLER.CLIENT.JS
        .controller("ProfileController", ProfileController);
    var users = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
        {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
        {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"},
    ];

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
    } */

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function(username, password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user._id) {
                $location.url("/profile/" + user._id);
            } else {
                vm.error = "User not found";
            }
            //var promise = UserService.findUserByUsernameAndPassword(username, password);
            //promise.then(function(response){
            //    console.log(response);
            //    var user = response.data;
            //      if(user) {
            //      $location.url("/profile/" + user._id);
            //      }else {
            //      vm.error = "User not found";
            //      }
            //OR

            //UserService
            //  .findUserByUsernameAndPassword(username, password);
            //  .then(function(response){
            //    console.log(response);
            //    var user = response.data;
            //      if(user) {
            //      $location.url("/profile/" + user._id);
            //      }else {
            //      vm.error = "User not found";
            //      }
        }
    }
})();