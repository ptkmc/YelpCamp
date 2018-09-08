var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Granite Hill",
//      image: "/images/campsite_2.jpg",
//      description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }
// );

// var campgrounds = [
//     {name: "Salmon Creek", image: "/images/campsite_1.jpg"},
//     {name: "Granite Hill", image: "/images/campsite_2.jpg"},
//     {name: "Blackwell", image: "/images/campsite_3.jpg"},
// ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("index", {campgrounds: allCampgrounds});
            }
        });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        console.log("CG: " + campground.name);     
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: campground});
        }
    });
    // res.render("show", {campground: 'fuck'});
});

app.listen(3000, function(){
    console.log("The YelpCamp Server has Started!");
});

