var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm5.staticflickr.com/4606/25989999068_703d3c88a6.jpg",
        description: "blah blah blah"
    },  
    {
        name: "So Far", 
        image: "https://farm8.staticflickr.com/7232/7287272714_c347c49072.jpg",
        description: "blah blah blah"
    }, 
    {
        name: "No one", 
        image: "https://farm1.staticflickr.com/618/31864167496_c3e217ee21.jpg",
        description: "blah blah blah"
    }  
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
    });
    //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("added a campground");
                // create a comment
                Comment.create(
                    {
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
            }
        });
    });

}

module.exports = seedDB;
