website.service.client.js
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
        {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
        {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"}
    ];

    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteById: findWebsiteById
        };
        return api;

        function findWebsiteById(websiteId){
            return $http.get("/api/website"+websiteId);
        }

        function createWebsite(userId, name, desc){
            var website = {
                name: name,
                description: desc
            };
            return $http.post("/api/user/"+userId+"/website", website);
/*            var newWebsite = {
                _id: (new Date()).getTime(),
                name: name,
                description: desc,
                developerId:developerId
            };
            websites.push(newWebsite);
            return newWebsite; */
        }

        function findWebsitesForUserId(userId) {
            return $http.get("/api/user/"+userId+"/website");
            //var resultSet = [];
            //for (var i in websites) {
            //    if(websites[i].developedId == userId) {
            //        resultSet.push(websites[i]);
            //    }
            //}
            //return resultSet;
        }
    }
})