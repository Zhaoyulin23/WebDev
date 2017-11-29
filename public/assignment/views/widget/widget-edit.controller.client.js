widget-edit.controller.client.js
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WebsiteListController($routeParams, WidgetService) {
        var vm = this;
        var widgetId = $routeParams.widgetId;

        function init() {
            WidgetService
                .findWidgetById(widgetId)
                .then(
                function (response) {
                    vm.widget = response.data;
                }
            )

        }

        init();
    }
});