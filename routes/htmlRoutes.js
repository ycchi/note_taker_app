const router = require("express").Router();
const path = require("path");

// render notes.html at the "/notes" path
router.get("/notes", function(req, res){
   res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// all other paths serve the home.html page
router.get("*", function(req, res) {
   res.sendFile(path.join(__dirname, "../public/home.html"))
});

module.exports = router;