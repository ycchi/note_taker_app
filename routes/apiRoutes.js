const router = require("express").Router();
const connection = require("../db/connection");

// get all notes
router.get("/api/notes", function(req, res){

   connection.query("SELECT * FROM notes;", function(err, notesDB){
      if (err) throw err;
      res.json(notesDB);
   });
});


// get specific note given an ID
router.get("/api/notes/:id",  function(req, res){
   connection.query("SELECT * FROM notes WHERE id = ?;", req.params.id, function(err, notesDB){

      if (err) throw err;
      res.json(notesDB);
   });
});


// post note
// req.body -> { title: "test title", body: "lorem ipsum..."}
router.post("/api/notes", function(req, res){
   connection.query("INSERT INTO notes SET ?", req.body, function(err, result) {
      if (err) throw err;
      res.json(result);
   })
});


// delete note
// req.body -> {}
router.delete("/api/notes", function(req, res) {
   connection.query("DELETE FROM notes WHERE id = ?", req.body.id, function(err, result) {
      if (err) throw err;

      console.log("req.body: " + req.body.id);
      console.log("result: " + result);
      res.json(result);
   });
});

module.exports = router;