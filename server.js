const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(require('./controllers'));

mongoose.Promise = Promise;
const dbURI = process.env.MONGODB_URI || "mongodb://username:password1@ds137255.mlab.com:37255/scrape-news";

mongoose.set('useCreateIndex', true)
mongoose.connect(dbURI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => {
    console.log("Mongoose Error: ", error);
});
db.once('open', () => {
    console.log('database connection successful');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

module.exports = app;