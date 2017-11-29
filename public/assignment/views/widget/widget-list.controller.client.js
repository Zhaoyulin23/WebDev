widget-list.controller.client.js
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WebsiteListController($sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;

        function init() {
            vm.widget = WidgetService.findWidgetForUserId(pageId);
            $(".container")
                //.draggable();
                //.sortable({axis: "y"});
        //}
        init();

        function getSafeHtml(widget) {
            return $sce.trustHTML(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed" + id;
            return $sce.trustAsResouceUrl(url);
        }

//        vm.websites = [
//            {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder"},
//            {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Harley"},
//            {_id: "345", username: "charley", password: "charley", firstname: "Charley", lastname: "Garcia"},
//            {_id: "456", username: "hi", password: "hi", firstname: "Hi", lastname: "Hello"}
//        ];
    }
});
