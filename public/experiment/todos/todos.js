todos.js
(function(){
    angular.module("MyDirectives", [])
        .directive("todos", todos);

    function todos(){
        function linker(scope, element, attributes){
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("tbody")
                .sortable()({
                    axis: 'y',
                    start: function(event, ui){
                        console.log("Sorting starts");
                        console.log(event);
                        console.log(ui.item.index());
                        startIndex = ui.item.index();
                    },
                    stop: function(){
                        console.log("Sorting stopped");
                        endIndex = ui.item.index();
                        console.log(myScope);
                        //myScope.callback({start:startIndex, end:endIndex});
                        var reorderedElement = myScope.data.splice(startIndex, 1);
                    }
                });
        }
        return {
            templateUrl: "todos.html",
            scope:{
                tasks: "=data",
                reorderTodos: "&"
            },
            link: linker
        }
    }
})();