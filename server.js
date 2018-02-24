// REQUIRED DEPENDENCIES =========================
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// INITIALIZE EXPRESS ============================
const app = express();

// USE BODY PARSER TO HANDLE FORM SUBMISSIONS ====
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// SETUP EXPRESS TO USE HANDLEBARS ===============
const expH = require('express-handlebars');
app.engine('handlebars', expH({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ArticleSaverDB';


mongoose.Promise = Promise;
mongoose.connect (MONGODB_URI, {
   // useMongoClient: true
}).catch((error) => {
    console.log(error);
});
require('./routes/routes')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function(){
    console.log('App listening on port ' + PORT);
})
