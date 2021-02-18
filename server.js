const express = require('express');

//importing database
const db = require('./models');
const categoriesRoute = require("./routes/categories");
const postsRoute = require("./routes/posts");
const auth = require("./routes/auth");

//initializing express instance
const app = express();
const PORT = process.env.PORT || 3000;



app.use(function(req, res, next){
    req.header("Access-Control-Allow-Origin", "*");
    req.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    next();
});

app.use(express.urlencoded( { extended:true } ));
app.use(express.json());


app.use("/api/categories", categoriesRoute)

app.use("/api/posts", postsRoute)

app.use("/api/auth", auth)

// api homepage
app.get('/', (req, res) => {

    res.send("Welcome to the API")

});

// api homepage
app.get('/api', (req, res) => {

    res.send("Welcome to the API");

});

// synchronizing, creating database if it doesn't exist
db.sequelize.sync().then(()=>{});

//  listen on port 3000 for development o
app.listen(PORT, () => {
    console.log(`listening on : http://localhost:${PORT}`);

});
