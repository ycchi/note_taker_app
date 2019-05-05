// dependencies
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// create express server
const app = express();

// set PORT - use heroku assigned port else use 3000.
const PORT = process.env.PORT || 3000;

// Middlewares
// set up middlewares to handle incoming data in json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static files. root = public
app.use(express.static("public"));

// set up route middleware
app.use(apiRoutes);
app.use(htmlRoutes);


// start server
app.listen(PORT,function(){
   console.log(`App listening on PORT: ${PORT}`)
});