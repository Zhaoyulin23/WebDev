app.js
(function(){
    angular
        .module("ToDoApp", ["MyDirectives"])
        .controller("TodoController", TodoController);

    function TodoController(){
        var vm = this;
        vm.reorderTodos = reorderTodos;
//        vm.data = [
//            {"priority":1, "title": "cs5610", "todo":"Teach angular directives"},
//            {"priority":2, "title": "cs5200", "todo":"Data modelling"}
//        ];

        function init() {
            $http.get("/api/todos")
                .then(function(response){
                    vm.data = response.data;
                });
        }
        init();

        function reorderTodos(start, end){
            console.log("TodoController");
            console.log(start);
            console.log(end);
            $http.put("/api/todos?start="+start+"&end"+end)
                .then(init);
        }
    }

})();