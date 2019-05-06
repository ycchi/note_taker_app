// global variables

let $noteList = $("#noteList");
let $noteDisplay = $("#noteDisplay");
let $title;
let $body;

const runNoteQuery = function () {
   
   // clear note list before running ajax
   $noteList.empty();

   $.ajax({
      url: "/api/notes",
      method: "GET"
   }).then(function(noteData){
      console.log(noteData)
      
      // loop through and display each notes
      for(let i = 0; i < noteData.length; i ++) {
   

         let $listItem = $("<button  class='list-group-item' type='button' id='noteItem'>");

         $listItem
            .append(
               $("<strong>").text(noteData[i].title),
               $("<p>").text(noteData[i].created_at)
               )
            .attr("data-id", noteData[i].id);
   
         $noteList.append($listItem);
      }
   })
};


// render note 
function renderNote (dataId) {
      
   // another ajax call?
   $.ajax({
      url: `/api/notes/${dataId}`,
      method: "GET"
   }).then(function(noteData){
      
      
      $title = $("<input class='note-title' placeholder='Note Title' maxlength='28' type='text' readonly='true'>");

      $title.val(noteData[0]["title"]);

      $body = $("<textarea class='note-textarea' placeholder='Write your note here' readonly='true' style='min-width: 100%; min-height: 100%'>");

      $body.val(noteData[0]["body"])

      let $hr = $("<hr>");

      $noteDisplay.append($title).append($hr).append($body);


      
   })
}





// on click event 
// adding a click event listener to all elements with an id of "noteItem"
$(document).on("click", "#noteItem", function() {
   console.log(`noteItem Clicked!!!`)

   // clear right column
   $noteDisplay.empty();

   // data-id to pass as an argument 
   let dataId = $(this).attr("data-id");

   renderNote(dataId);
})


// on click on new-note icon to change read-only state to false
let $newNote = $(".new-note");

$newNote.on("click", function(){

   
   console.log($title.val());
   
   // show placeholder text if $title.val exists
   $title.val("")
   $body.val("")

   // change read-only to false
   $title.attr("readonly", false);
   $body.attr("readonly", false);
   
   // detect key input at the very first instance, ignore rest keypress
   // show 'save' icon 
   $body.one("keypress", function(){
      $(".save-note").css({display: "inline"})
   })
})


// save-note
let $saveNote = $(".save-note");

$saveNote.on("click", function(){
   
   // save contents(title, body) to variable as an object
   let noteTitleInput = $(".note-title").val().trim();
   let noteBodyInput = $(".note-textarea").val().trim();

   let newNote = {};
   newNote.title = noteTitleInput;
   newNote.body = noteBodyInput;

   console.log(newNote);

   //ajax post method
   $.ajax({
      url: `/api/notes/`,
      method: "POST",
      data: newNote
   }).then(function(noteData){
      
      console.log(`new note added`)
      
      // refresh the page
      runNoteQuery();
      
   })

})











runNoteQuery();