website-list.controller.client.js
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            //vm.websites = WebsiteService.findWebsitesForUserId(vm.userId);
            WebsiteService
                .findWebsitesForUserId(vm.userId)
                .then(
                    function(response) {
                        vm.websites = response.data;
                    }
                )
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
