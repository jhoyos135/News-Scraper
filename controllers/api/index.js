const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const Article = require('../../models/articles');
const Note = require('../../models/notes');

router.get('/', (req, res) => {
    res.status(200).send("<a href=\'/api/articles/\'>articles</a><br><a href=\'/api/notes/\'>notes</a>");
})

router.use('/articles', require('./articles'));
router.use('/notes', require('./notes'));

module.exports = router;