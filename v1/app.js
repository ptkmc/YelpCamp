var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var campgrounds = [
    {name: "Salmon Creek", image: "/images/campsite_1.jpg"},
    {name: "Granite Hill", image: "/images/campsite_2.jpg"},
    {name: "Blackwell", image: "/images/campsite_3.jpg"},
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has Started!");
});