// Add to to do list
$(document).ready(
    $("#new-item").on('click', function() {
        var toAdd = $('input').val();    // whatever user types in input is stored in the variable
        $('#p-to_do').prepend('<li>' + toAdd + "  " + "<button> Done!</button>" + '</li>');    //prepend puts it on top of the list
        $('input').val('');   //clears input field after it goes to 'to do' list
    })
);

// Move to completed list
$("#list_todo").on('click', 'button', function(){
  $(this).html("Still Incomplete!");      // this is what is being clicked i.e. <button>
  var completedItem = $(this).parent();   // parent refers to one level above this(<button>) which is <li>
  $("#p-done").prepend(completedItem);
});

//Move it back to first list
$("#list_completed").on('click','button', function(){
  $(this).html("Done!");
  var incompleteItem = $(this).parent();
  $("#p-to_do").prepend(incompleteItem);
});