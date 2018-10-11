var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Greek", image: "https://farm4.staticflickr.com/3910/14868621954_64820165d7.jpg"},
            {name: "Granite Hill", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3082/2829543896_2c2c38535e.jpg"},
            {name: "Salmon Greek", image: "https://farm4.staticflickr.com/3910/14868621954_64820165d7.jpg"},
            {name: "Granite Hill", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3082/2829543896_2c2c38535e.jpg"}
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});

app.listen(8081, '0.0.0.0', function() {
   console.log("The YelpCamp Server has started!"); 
});