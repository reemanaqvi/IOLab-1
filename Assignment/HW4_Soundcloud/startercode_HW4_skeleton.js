// 1.	QUERYING SOUNDCLOUD’S API (9 total points)
//     a.	(2 point) User can input text to search SoundCloud’s API
//     b.	(1 point) Use the provided callAPI() function.
//     i.	Hint: You’ll need to pass in the user’s search query as the argument for the callAPI() function.
//     c.	(6 points) The first 20 results from the response object are rendered on the page. Each song result displays the following information for that song:
//         i.	Song title
//         ii.	Artist
//         iii.	Picture

// 2.	PLAYING SONGS VIA THE STRATUS PLUGIN (5 total points)
//     a.	(3 points) User can click a ‘play’ button attached to each song result to play that song via the Stratus player plugin.
//     b.	(2 points) Use the provided playSong() function and pass in the song’s permalink URL as the argument for playSong().
//           i.	Hint: Find the ‘permalink_url’ field for each song in the SoundCloud API response object and pass this URL as the argument for the playSong() function.
//           c.	Cut and paste the following link to the Stratus player JS file in your HTML file.
//           i.	<script type='text/javascript' src="stratus-player.js"></script>

// 3.	CREATING A PLAYLIST (12 total points)
//     a.	User can create a playlist of songs by picking individual songs from the search results.
//     b.	(2 points) User can click an ‘add to playlist’ button attached to each song result to add a song to the playlist.
//     c.	(2 point) Songs are added to the top of the playlist. Hint: use the .prepend() method.
//     d.	(2 point) Songs are not ‘removed’ from the search results when they’re added to the playlist. Hint: use the jQuery .clone() method to prevent them from being removed from the search results.
//     e.	(2 point) User can remove songs from the playlist. Hint: use the jQuery .remove() method.
//     f.	(2 points) User can move songs up or down in the playlist one spot at a time. Hint: use the jQuery .prev(), .next(), .insertBefore(), and .insertAfter() methods.
//     g.	(2 point) User can play songs that are in the playlist. This play functionality is the same as the play functionality in the search results.



// Event hander for calling the SoundCloud API using the user's search query
$(document).ready(function(e) {
 	$('#search-button').click(function() {
 	$('#search-results').empty();         // New search query empties old results
 	var searchString = $('input').val();  // Store query value in var searchString
 	callAPI(searchString);
	})

 	// Pressing enter key === clicking Search button
	$('input').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-button').click();//Trigger search button click event
        }
    });
 });


function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			for (var i = 0; i < 20; i++) {
				if (data[i].artwork_url !== null) {
					var image = data[i].artwork_url;
				}
 				else {
 					var image = "404.jpg";
 				}

 				var title = data[i].title;
 				var artist = data[i].user.username;
 				var url = data[i].permalink_url;
				var div = "<div id='single-result'><p>" + title + "</p>\
							<p>"+ artist + "</p><img src='"+ image +"'>\
							<button class='play' id="+url+">Play</button>\
							<button class='playlist-button'>Add to Playlist</button></div>"

				$("#search-results").append(div);
			};
		},'json'
	);
}


// User can click a ‘play’ button attached to each song result to play that song via the Stratus player plugin.
$(document).on('click', '.play', function () {
	var url = $(this).attr('id');
	changeTrack(url);
});

// Click Add to playlist button to copy song to playlist div, and add remove, up and down buttons
$(document).on('click', '.playlist-button', function () {
	var move = $(this).parent().clone();
	move.children().eq(4).html('Remove from Playlist');    // eq = index. Button is at the 4th index in move
	move.children().eq(4).attr('class', 'remove-button');
	move.append("<button class='up'>Up</button>" + "<button class='down'>Down</button>");  // Add up and down button 
	$('#playlist').prepend(move);  // Adds everything to the playlist
});


// Clicking remove button in playlist removes the song from playlist
$(document).on('click', '.remove-button', function(){
	$(this).parent().remove();
})

// Clicking up button in playlist moves the song 1 position up 
$(document).on('click', '.up', function(){
	$(this).parent().insertBefore($(this).parent().prev());
})

// Clicking down button in playlist moves the song 1 position down
$(document).on('click', '.down', function(){
	$(this).parent().insertAfter($(this).parent().next());
})



// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });


}


