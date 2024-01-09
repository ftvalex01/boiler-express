require('dotenv').config();
let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

let absolutePath = __dirname + '/views/index.html';
app.get("/", function(req, res) {
    res.sendFile(absolutePath);
});

const note = {
    "message":"Hello json"
  };

app.get('/json', (req, res) => {

    if(process.env.MESSAGE_STYLE == 'uppercase'){
        
      note.message = note.message.toUpperCase();
      
    }else{
        note.message
    }
  
    res.json(note);
    
  });

module.exports = app;
