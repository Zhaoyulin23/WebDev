widget-flickr-search.controller.client.js
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)

    function FlickrImageSearchController(FlickrService){
        var vm = this;
        vm.searchPhotos = searchPhotos;

        function searchPhotos(searchText) {
            FlickrService
                .console.log(searchText)
                .then(function(response){
                    console.log(response);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
    }
})();