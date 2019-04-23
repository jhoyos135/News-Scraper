const express = require('express');
const router = express.Router();
const Article = require('../models/articles');

router.get('/', (req, res) => {
    Article.find({})
    .where('saved').equals(false)
    .where('deleted').equals(false)
    .sort('-date')
    .limit(20)
    .exec((error, articles) => {
        if(error) {
            console.log(error);
            res.status(500);
        } else {
            let obj = {
                title: 'News Scraper',
                subtitle: 'From NPR',
                articles: articles
            };
            res.render('index', obj)
        }
    });
});

router.get('/saved', (req, res) => {
    Article.find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('date')
        .exec((error, articles) => {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                let obj = {
                    title: 'News Scraper',
                    subtitle: 'Saved News',
                    articles: articles
                };
                res.render("saved" ,obj);
            }
        });
});


router.use('/api', require('./api'));
module.exports = router;