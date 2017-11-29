app.js

module.exports = function(app) {
    console.log("Hello from new module");



    require("/services/user.service.server.js")(app, model);
    require("/services/website.service.server.js")(app, model);
    require("/services/widget.service.server.js")(app, model);

    app.get("/say/:something", function(req,res){
       var msg = req.params['something'];
        res.send({message: msg});
    });

    var users = [
        {_id: "123", username: "alice", password: "alice"},
        {_id: "234", username: "bob", password: "bob"},
        {_id: "345", username: "charley", password: "charley"}
    ];
    app.get("/users/:id", function(req, res){
        var id = req.params.id;
        for(var i in users){
            if (users[i]._id == id){
                res.send(users[i]);
                return;
            }
        }
       res.send(users);
    });
};