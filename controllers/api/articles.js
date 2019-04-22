const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const Article = require('../../models/articles');
const axios = require('axios');

router.get('/', (req, res) => {
    Article.find({}).exec((error, docs) => {
        if(error) {
            res.status(500)
        } else {
            res.status(200).json(docs);
        }
    })
});

// get all saved articles
router.get('/saved', (req, res) => {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.status(200).json(docs);
            }
        });
});

router.get('/deleted', (req, res) => {
    Article
        .find({})
        .where('deleted').equals(true)
        .exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.status(200).json(docs);
            }
        });
});

router.post('/save/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, {
        $set: { saved: true}
        },
        { new: true },
        function(error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/');
            }
        });
});

router.delete('/dismiss/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true } },
        { new: true },
        function(error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/');
            }
        });
});

router.delete('/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true} },
        { new: true },
        function(error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/saved');
            }
        }
    );
});

router.get('/scrape', (req, res, next) => {
    axios.get("https://www.npr.org/sections/news/").then((response) => {
        let $ = cheerio.load(response.data);

        $("div.item-info").each(function(i,element) {
            let title = $(element).find($('.title')).text();
            let slug = $(element).find($('.slug')).text();
            let teaser = $(element).find($('.teaser')).text();
              
            let single = {};
        
                single = {
                    title: title,
                    slug: slug,
                    teaser: teaser
                };
                let entry = new Article(single)
                
                entry.save((err, doc) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('article added')
                    }
                });
            
          });
          next();
    });
}, (req, res) => {
    res.redirect('/');
});


module.exports = router;