let express = require("express");
let app = express();
console.log("Hello World");
console.log(process.env.MESSAGE_STYLE);

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
console.log(
  bodyParser, 
  bodyParser.urlencoded.toString(), 
  bodyParser.json().toString()
);
*/

app.post("/name", (req, res) => {
  res.json({
    name: req.body.first + " " + req.body.last,
    //,reqQuery: req.query
  });
});

app.get("/name", (req, res) => {
  const { first, last } = req.query;
  res.json({ name: first + " " + last });
  console.log(req.query);
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
  console.log(req.params);
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next(console.log("I'm first next()"));
  },
  (req, res) => {
    res.send({ time: req.time });
  },
);

app.get("/json", (req, res, next) => {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);

  //res.json({ "message": string });
  // Only one output in the same path, when you set two res.json will cause the error.

  next(console.log("I'm second next()"));
});

app.get("/json", (req, res) => {
  var message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message: message });
  console.log("I'm app.get 3, I can output under response");

  //var string = req.method + " " + req.path + " - " + req.ip;
  //console.log(string);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  console.log("This is the last app.get");
  //res.send("Hello Express");

  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);

  //res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
