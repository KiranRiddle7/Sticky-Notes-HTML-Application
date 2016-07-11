  
   var notes;
   var count = 0;

 
       // Save button save all the notes into Local Storage               
       $("#saveNote").click(function saveNotes() {
    
          var notesArray = [];

  
           // for each of the notes add a bespoke note object to the array
           notes.find("li > div").each(function (i, e) {
               // Save the Color, Title and Description of the Notes.
               var colourClass = $(e).attr("class");
               var noteTitle = $(e).find("textarea.noteTitle");
               var noteDescription = $(e).find("textarea.noteDescription");
  
               notesArray.push({ Index: i, Title: noteTitle.val(), Content: noteDescription.val(), Class: colourClass });
           });
  
           // Encoding it with JSON
           var jsonString = JSON.stringify(notesArray);
  
           // Saving The JSON into Local Storage
           localStorage.setItem("notes", jsonString);
  
           // Alert the user regarding the saved status
           alert("Success! All Your Notes Are Saved.");

          });


        // Adding Event Handlers To Notes
        function addNoteEvent(noteElement) {
            var div = noteElement.children("div");
            var closeImg = div.find("img");

            div.focus(function () {
                closeImg.removeClass("hide");
            });

            div.children().focus(function () {
                closeImg.removeClass("hide");
            });

            div.hover(function () {
                closeImg.removeClass("hide");
            }, function () {
                closeImg.addClass("hide");
                saveNotes();
            });

            div.children().hover(function () {
                closeImg.removeClass("hide");
            }, function () {
                closeImg.addClass("hide");
            });
        }
          
       // Function that creates a new note
         function createNew(className, title, content) {
            // If class is not specified, use a random colour class
             if (!className) {
                 className = "colour" + Math.ceil(Math.random() * 3);
             }
        
             // Adding newly created note to the end of the list.
            notes.append("<li><div class='" + className + "'>" + 
                "<textarea class='noteTitle' placeholder='Title' maxlength='15'/>" + 
                "<textarea class='noteDescription' placeholder='Description'/>" + 
                "<img class='hide' src='images/deleteNote.png'/>" + 
                "</div></li>");

        
             // Adding delete option to the newly created note and attaching the click event handler.
             var newNote = notes.find("li:last");
             newNote.find("img").click(function() {
                 newNote.remove();
             });
        
             // Setting up event handlers to show/hide delete button
             addNoteEvent(newNote);
        
             // Setting up title of a new note
             if (title) {
                 // Grabbing the title and setting the value
                 newNote.find("textarea.noteTitle").val(title);
             }
        
             // Setting up the content of a new note
             if (content) {
                 // Grabbing the content and setting the value
                 newNote.find("textarea.noteDescription").val(content);
             }
         }

        
  
          // Loading the saved notes from local storage
          function loadNotes() {
              var storedNotes = localStorage.getItem("notes");
              if (storedNotes) {
                  // passes the stored json back into an array of note objects
                  var notesArray = JSON.parse(storedNotes);
                  count = notesArray.length;

                  var i;
                  for (i = 0; i < count; i++) {
                      var storedNote = notesArray[i];
                      createNew(storedNote.Class, storedNote.Title, storedNote.Content);
                  }
              }
          }

          $(document).ready(function () {
              // get references to the 'notes' list
              notes = $("#notes");

              // load notes from local storage if one's available
              loadNotes();

              // clicking the 'New Note' button adds a new note to the list
              $("#newNote").click(function () {
                  createNew();
              });

              // add a note to the list if there aren't any
              if (count === 0) {
                  $("#newNote").click();
              }
          });

  

