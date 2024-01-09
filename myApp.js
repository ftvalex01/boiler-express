
require('dotenv').config() 
let express = require('express');
let app = express();
let indexPath = __dirname + "/views/index.html";
let publicPath = __dirname + "/public";
let bodyParser = require('body-parser');


app.use("/public", express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", function (req, res) {
    res.sendFile(indexPath);
});

  
app.use((req, res, next) => {

    const method = req.method;
    const path = req.path;
    const ip = req.ip;

   
    console.log(`${method} ${path} - ${ip}`);

    
    next();
});

app.get("/now", function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({ time: req.time });
});

/*   app.get('/json', function (req, res) {
    res.json( {"message": "Hello json"} )
});

 */
let object = { "message": "Hello json" };

app.get("/json", function (req, res) {
    let messageStyle = process.env.MESSAGE_STYLE;

    if (messageStyle === "uppercase") {
        object.message = object.message.toUpperCase();
    }

    res.json(object);
});



app.get("/:word/echo", function (req, res) {
    const word = req.params.word;
    res.json({echo: word});
});
app.post("/name", function (req, res) {

    const firstName = req.body.first;
    const lastName = req.body.last;


    res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;