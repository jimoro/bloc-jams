
var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '     <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '     <td class="song-item-title">' + songName + '</td>'
    + '     <td class="song-item-duration">' + songLength + '</td>'
    + '     </tr>'
    ;
    
    var $row = $(template);
    
/******* My attempt prior to viewing the solution

    var clickHandler = function() {
        var songNumberCell = $(this).find('.song-item-number');
        
        if (currentlyPlayingSong === null) {
            songNumberCell.html(pauseButtonTemplate);
            currentlyPlayingSong = $(this).find('data-song-number');
        }
            else if (currentlyPlayingSong === $(this).find('data-song-number')) {
                songNumberCell.html(playButtonTemplate);
                currentlyPlayingSong = null;
        }
            else if (currentlyPlayingSong !== $(this).find('data-song-number')) {
                songNumberCell.html(pauseButtonTemplate);
                currentlyPlayingSong = $(this).find('data-song-number');
        }
    };
*/

    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        
        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = parseInt(songNumber);
            currentSongFromAlbum = currentAlbum.songs[parseInt(songNumber) - 1];
            UpdatePlayerBarSong();
            
        } else if (currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
                
    var offHover = function(event) {
        // Revert the content back to the number (from the play button)
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};


var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);  //  !! review indexOf() method & syntax
}

/*****  Correct solution follows attempt in this commented block
var nextSong = function() {
    //  - Know what the next song is, including when wrapping from the last to first
    var nextTrack;
    
    if (currentlyPlayingSongNumber !== currentAlbum.songs.length) {
        nextTrack = currentlyPlayingSongNumber + 1;    
    } 
    else {
        nextTrack = 1;
    }
    
    //  - Use the 'trackIndex()' helper function to get the index of the current song and then increment the index value
    var songIndex = trackIndex(currentAlbum, currentSongFromAlbum.title);
    songIndex++;
    
    //  - Set a new current song to 'currentSongFromAlbum'
    var previousSongFromAlbum = currentSongFromAlbum;
    currentSongFromAlbum = currentAlbum.songs[songIndex - 1]; // Subtract 1 for zero starting index number
    
    //  - Update the player bar to show the new song
    UpdatePlayerBarSong();
    
    //  - Update the HTML of the previous song's '.song-item-number' element with a number
    
    
    //  - Update the HTML of the new song's '.song-item-number' element with a pause button
     
    
};
*/

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // increment the song
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    // Update the Player Bar info
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};


var previousSong = function() {

    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2; 
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // decrement the song
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    // Update the Player Bar info
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};


/******* Checkpoint 19 attempt prior to viewing the solution
var updatePlayerBarSong = function() {
    $('.song-name').text = currentSongFromAlbum;
    $('.artist-name').text = currentAlbum.artist
    $('.artist-song-mobile').text = currentAlbum.artist + " - " + currentSongFromAlbum;
}
*/
var UpdatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " + " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);  
};


// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
        
// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
