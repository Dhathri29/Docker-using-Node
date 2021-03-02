const express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//include routes
const noderoute = require("./routes/nodedocker");

// Set view engine
app.set("view engine", "ejs");

// User Middleware
app.use("/", noderoute);

// Start Server
app.listen(3000, () => {
    console.log("Server started");
});
