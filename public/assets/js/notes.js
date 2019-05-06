let $noteList = $("#noteList");
let $noteDisplay = $("#noteDisplay");

const runNoteQuery = function () {
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
      
      
      let $title = $("<input class='note-title' placeholder='Note Title' maxlength='28' type='text' readonly='true'>");

      $title.val(noteData[0]["title"]);

      let $body = $("<textarea class='note-textarea' placeholder='Write your note here' readonly='true' style='min-width: 100%; min-height: 100%'>");

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


runNoteQuery();