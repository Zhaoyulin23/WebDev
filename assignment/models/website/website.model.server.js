website.model.server.js

modeule.exports = function(){
    var mongoose = require("mongoose");
    var WebsiteSchema = require("/website.schema.server.js");
    var website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser
    };
    return api;

    function findWebsiteById(websiteId){
        return Website.findById(websiteId);
    }

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }
}