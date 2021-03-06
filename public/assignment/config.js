config.js
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: "views/home..html"
            })
            .when("/html", {
                templateUrl: "views/widget/widget-html-edit.view.client.html"
            })
            .when("/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller:"websiteListController"
            })
            .when("/website/new", {
                templateUrl: "website/website-new.html"
            })
            .when("/website/:wid", {
                templateUrl: "website/website-edit.view.client.html"
            })
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:widgetId", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller:"WidgetEditController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedIn(UserService, $location, $q){

            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0'){
                            deferred.reject();
                            $location.url("/login");
                        }else {
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();
