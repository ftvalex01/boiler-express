require('dotenv').config() 

let express = require('express');
let app = express();
let indexPath = __dirname + "/views/index.html";
let publicPath = __dirname + "/public";
let object = {"message": "Hello json"};

console.log("Hello World");

app.use("/public", express.static(publicPath));

app.get("/", function (req, res) {
    res.sendFile(indexPath);
});

app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        object.message = object.message.toUpperCase();
    }

    res.json(object);
});

