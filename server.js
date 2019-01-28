var express = require("express");

var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs  = require('express-handlebars');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytscraper", { useNewUrlParser: true });
var articleModel = require("./models/Article")

var PORT = process.env.PORT || 3000;

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', function(req,res) {
    res.render('home');
})


app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/technology").then(function(response) {
    
    // console.log('this is what we got when we tried to scrape!!', response.data)

      var $ = cheerio.load(response.data);
      console.log('did this work ??', $('.css-1dq8tca').html());
    //   console.log($(".css-1echdzn").html());

      $(".css-1dq8tca").each(function(i, element) {
        console.log("Test", $(this).html())
        var thingToSave = {
          title: $(this).html(),
          link: "",
          favorited: false
        }
        articleModel.create(thingToSave).then(function(data){
          console.log(data);
        })
      });
  

    res.send("Scrape Complete");
  });

});

app.get("/allarticles",function(req,res){
  console.log("we hit the route")
  articleModel.find({}).then(function(data){
    res.json(data)
  })
})

app.put('/updateArticles/:id', function(req, res) {
  console.log('WE HIT UPDATE!!!', req.params);


  

})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  