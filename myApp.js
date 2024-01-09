var express = require('express');
const bodyParser = require('body-parser');
var app = express();

const note = {
  "message":"Hello json"
};

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


app.get('/json', (rq, rs) => {

  if(process.env.MESSAGE_STYLE == 'uppercase'){

    note.message = note.message.toUpperCase();
    
  };

  rs.json(note);
  
});