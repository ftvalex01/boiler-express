var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.use((rq, rs, next) => {

  console.log(`${rq.method} ${rq.path} - ${rq.ip}`);
  next();
  
});

app.get('/', (rq, rs) => {

  console.log( "Hello World" );
  rs.sendFile( __dirname + '/views/index.html' );
  
});


var message= 'Hello json';
app.get("/json", (req, res) => {
  if ( process.env['MESSAGE_STYLE'] === "uppercase") {
      res.json({ "message": message.toUpperCase() });
  }
  else {
    res.json({ "message": message });
  }
});