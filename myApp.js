let express = require('express');
let app = express();
require('dotenv').config();

console.log("Hello World")



app.use("/public", express.static(__dirname + "/public"));
/* app.get("/", function(req, res) {
     res.send("Hello Express");
   }); */
   absolutePath = __dirname + '/views/index.html'
   app.get("/", function(req, res) {
       res.sendFile(absolutePath);
  });

  



/*   app.get('/json', function (req, res) {
    res.json( {"message": "Hello json"} )
});

 */


app.get('/json', function (req, res) {
    let responseMessage = "Hello json";

    if (process.env.MESSAGE_STYLE === "uppercase") {
        responseMessage = responseMessage.toUpperCase();
    }

    res.json({"message": responseMessage});
});

