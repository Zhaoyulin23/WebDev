register.controller.client.js
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(username, password, password2) {
            UserService
                .createUser(username, password)
                .then(
                    function(response) {
                        var user = response.data;
                        if (user) {
                            $location.url("/profile/" + user._id);
                        }

                    },
                    function(err){
                        vm.err = err;
                    })
        }
    }
})();