let $noteList = $("#noteList");

const runNoteQuery = function () {
   $.ajax({
      url: "/api/notes",
      method: "GET"
   }).then(function(noteData){
      console.log(noteData)
      
      // loop through and display each notes
      for(let i = 0; i < noteData.length; i ++) {
   

         let $listItem = $("<button  class='list-group-item' type='button'></button>");

         $listItem
            .append(
               $("<strong>").text(noteData[i].title),
               $("<p>").text(noteData[i].created_at)
               )
            .data("id", noteData[i].id);
   
         $noteList.append($listItem);
      }
   })
};

runNoteQuery();