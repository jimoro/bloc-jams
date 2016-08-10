// Example Album

var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

//Another Example Album

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' }
    ]
};

//Yet Another Example Album
var albumDali = {
    title: 'The Persistence of Memory',
    artist: 'Salvador Dali',
    label: 'Surrealism',
    year: '1931',
    albumArtUrl: 'https://mangelocuaycong.files.wordpress.com/2013/08/the-persistence-of-memory.jpg',
    songs: [
        { title: 'Anteater On a Leash', duration: '2:02' },
        { title: 'Madrid and Paris', duration: '4:20' },
        { title: 'Elephant and Obelisk', duration: '2:13' },
        { title: 'Metamorphosis of Narcissus', duration: '3:54' },
        { title: 'Freud and Heisenberg', duration: '2:15' }
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '     <td class="song-item-number">' + songNumber + '</td>'
    + '     <td class="song-item-title">' + songName + '</td>'
    + '     <td class="song-item-duration">' + songLength + '</td>'
    + '     </tr>'
    ;
    
    return template;
};

// #1 - Select elements that we want to populate with text dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    // #2
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    // #3
    albumSongList.innerHTML = '';
    
    // #4
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);        
    }
};

window.onload = function() {
    setCurrentAlbum(albumPicasso);
    
    var theAlbums = [albumPicasso, albumMarconi, albumDali];
    var i2 = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(theAlbums[i2++]);
        if (i2 == theAlbums.length) {
            i2 = 0;
        }
    });
};
