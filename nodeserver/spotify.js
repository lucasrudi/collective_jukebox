

var spotify = require('spotify')({ appkeyFile: 'spotify_appkey.key' });
spotify.ready( function() {
 var starredTracks = spotify.getStarred().getTracks();
 spotify.player.play(starredTracks[0]);
});
var username = "11122869937";
var password = "hotdog1234";

spotify.login(username, password, true, false);
spotify.ready( function() {
	var starredPlaylist = spotify.getStarred();
	console.log("playlist are" + JSON.stringify(starredPlaylist));
	var track = starredPlaylist.getTracks();
	console.log(track);
		
});

var search = new spotify.Search('agapornis');
search.execute( function(err, searchResult) {
	var track = searchResult.tracks[0];
	spotify.player.play(track)
});