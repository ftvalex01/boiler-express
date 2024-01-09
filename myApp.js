
require('dotenv').config() 
let express = require('express');
let app = express();
let indexPath = __dirname + "/views/index.html";
let publicPath = __dirname + "/public";



app.use("/public", express.static(publicPath));

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





module.exports = app;