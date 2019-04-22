const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({

    title: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: false
    },
    teaser: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note",
        required:  false
    }]


});

const Article = mongoose.model("Article" , ArticleSchema);
module.exports = Article;