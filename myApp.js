let express = require('express');
let app = express();
require('dotenv').config();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

let absolutePath = __dirname + '/views/index.html';
app.get("/", function(req, res) {
    res.sendFile(absolutePath);
});

const note = {
    "message":"Hello json"
  };

app.get('/json', (rq, rs) => {

    if(process.env.MESSAGE_STYLE == 'uppercase'){
  
      note.message = note.message.toUpperCase();
      
    };
  
    rs.json(note);
    
  });

module.exports = app;
