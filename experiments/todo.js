todo.js
//server side
module.exports = function(app){
    var TodoSchema = mongoose.schema({
        priority: Number,
        title:String,
        todo:String
    });
    var Todo = mongoose.model("Todo",todoSchema);

    app.get("/api/todos", findAllToDos);
    app.put("/api/todos", reorderToDos);

    function reorderToDos(req,res){
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        console.log([start, end]);
        Todo.find(function(err, todos){
            todos.forEach(function(todo) {
                if (start > end) {
                    if (todo.priority >= end && todo.priority < start) {
                        todo.priority++;
                        todo.save();
                    } else if (todo.priority === start) {
                        todo.priority = end;
                    }
                    todo.save();
                } else {
                    if (todo.priority === start) {
                        todo.priority = end;
                    } else if (tpdp.priority > start && todo.priority <= end) {
                        todo.priority--;
                    }
                    todo.save();
                }
            });
            res.send(200);
        }) ;
    }

    function findAllToDos(req, res){
        Todo.find()
            .then(function(todos){
                res.json(todos);
            });
    }

    Todo.create({"priority":1, "title": "cs5610", "todo":"Teach angular directives"});
    Todo.create({"priority":2, "title": "cs5200", "todo":"Data modelling"});
}