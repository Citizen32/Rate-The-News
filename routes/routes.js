// Set up routes for users

// Set up dependencies
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models"); // require all models

// Routes
module.exports = function(app) {
  // Main route, start with GET to find all articles in database
  app.get("/", function(req, res) {
    db.Article.find({}).exec(function(error, data) {
      // create array to hold article data
      let resultData = [];
      // for each article, save information from database into array to use in hbs
      data.forEach(function(dbArticle) {
        resultData.push({
          title: dbArticle.title,
          summary: dbArticle.summary,
          link: dbArticle.link,
          article_id: dbArticle._id,
          note_id: dbArticle.note
        });
      });
      // render index using result object from above
      res.render("index", {
        result: resultData
      });
    });
  });

  // GET route for scraping
  app.get("/scrape", function(req, res) {
    axios.get("http://www.nytimes.com").then(function(response) {
      const $ = cheerio.load(response.data);
      $("article.story").each(function(i, element) {
        const result = {};
        // Add title and link of each article and save to the results object
        result.title = $(this)
          .children("h2")
          .children("a")
          .text();
        result.summary = $(this)
          .children("p.summary")
          .text();
        result.link = $(this)
          .children("h2")
          .children("a")
          .attr("href");
        console.log(result);
        // Create a new Article using result object from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(error) {
            return res.json(error);
          });
      });
      // If successful, redirect
      res.redirect("/");
      //res.send('Scrape Compelete')
    });
  });

  // GET route for getting all Articles from the database
  app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(error) {
        res.json(error);
      });
  });

  // GET route for getting a specific Article by id
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({
      _id: req.params.id
    })
      .populate("note") // populate notes associated with article
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(error) {
        res.json(error);
      });
  });

  // POST route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            note: dbNote._id
          },
          {
            new: true
          }
        );
      })
      .then(function(dbArticle) {
        res.redirect("/");
      })
      .catch(function(error) {
        res.json(error);
      });
  });
};
