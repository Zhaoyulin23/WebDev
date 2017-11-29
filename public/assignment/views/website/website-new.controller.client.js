website-new.controller.client.js
(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description){
            //Snychronized
            //var newWebsite = WebsiteService.createWebsite(vm.userId, name, description);
            //if(newWebsite) {
            //    $location.url("/user/"+vm.userId+"/websites");
            //}else{
            //    vm.error = "unable to create website";
            //}

            //Asynchronsized
            WebsiteService
                .createWebsite(vm.userId, name, description)
                .then(
                    function(response) {
                        var newWebsite = response.data;
                        if(newWebsite){
                            $location.url("/user/"+vm.userId+"/website");
                        }else{
                            vm.error = "unable to create website";
                        }
                    }
                )
        }

function init() {
    vm.websites = WebsiteService.findWebsitesForUserId(vm.userId);
}
init();

//        vm.websites = [
//            {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
//            {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
//            {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
//            {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"}
//        ];
}
});
