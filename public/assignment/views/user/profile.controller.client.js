profile.controller.client.js
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
/* MOVE THIS DATA TO USER.SERVIE.CLIENT.JS
    var users = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
        {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
        {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"},
    ];
 */
 /*Server side
    function init() {
        UserService
            .findUserById(id)
            .then(function(response){
               vm.user = response.data;
            });
    }
    init();

    function logout(){
        UserService
            .logout()
            .then(
                function(response){
                    $location.url("/login");
                },
                function() {
                    $location.url("/login");
                }
            )
    }
*/

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        var id = $routeParams.id;
        var index = -1;
        for (var i in users) {
            if (user[i]._id == id) {
                vm.user = users[i];
                index = i;
            }
        }


        function Unregister(){
            UserService
                .deleteUser(id)
                .then(
                    function() {
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove"
                    }
                );
        }

        function updateUser(newUser) {
            UserService.updateUser(id, newUser);
            //console.log(newUser);
            //users[index].firstName = newUser.firstName;
            //users[index].lastName = newUser.lastName;
        }
    }


//    function ProfileController($routeParams, UserService) {
//        var vm = this;
//        var id = $routeParams.id;
//       vm.user = UserService.findById(id);
//    }
})();