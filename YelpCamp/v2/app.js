var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144290f5c678a2e8b1_340.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res) {
    res.render("landing");
});
//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    Campground.create(newCampground,
    function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});
// SHOW - shows more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(8081, '0.0.0.0', function() {
   console.log("The YelpCamp Server has started!"); 
});