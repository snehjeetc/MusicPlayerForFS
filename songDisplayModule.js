let songImageElement = document.getElementById('img');
let songNameElement = document.getElementById('songName');
let artistNameElement = document.getElementById('artist');
let addPlaylistButton = document.getElementById('addSongToPlaylist');
let playlistOptions = document.getElementById('playlistOptionsToAdd');

playlistOptions.addEventListener("mouseleave", () => {
    playlistOptions.style.display = 'none';
    document.getElementById("addPlaylistIcons").style.display = 'inline-block';
}); 

playlistOptions.addEventListener("change", () => { 
    // console.log("playlist name: ", playlistOptions.value, "song : ", currentSongPlaying); 
    if(playlistOptions.selectedIndex != 0)
        addSongToPlaylist(playlistOptions.value, currentSongPlaying);
});

function loadSong(song) {
    //initially the song will be empty 
    if (!song) {
        songImageElement.src = '';
        songNameElement.textContent = '';
        artistNameElement.textContent = '';
        addPlaylistButton.style.display = 'none';
        return;
    }
    let { img, name, artist, audioSrc } = song.currentNode;
    // console.log(src, songName, artist);
    songImageElement.src = img;
    songNameElement.textContent = name;
    artistNameElement.textContent = artist;
    let audioControl = document.getElementById('audioControl');
    audioControl.setAttribute('src', audioSrc);
    addPreviousButton(song);
    addNextButton(song);
    addPlaylistButton.style.display = 'inline-block';
}

function addPreviousButton(song) {
    let prevButton = document.getElementById('prevButton');
    if (song.previousNode) {
        prevButton.style.display = 'inline-block';
        prevButton.addEventListener('click', () => {
            playSong(song.previousNode);
        }, { once: true });
    } else {
        prevButton.style.display = 'none';
    }
}

function addNextButton(song) {
    let nextButton = document.getElementById('nextButton');
    if (song.nextNode) {
        nextButton.style.display = 'inline-block';
        nextButton.addEventListener('click', () => {
            playSong(song.nextNode);
        }, { once: true })
    } else {
        nextButton.style.display = 'none';
    }
}

addPlaylistButton.addEventListener("click", () => {
    renderPlaylistOptions(playlistOptions);
    playlistOptions.style.display = 'inline-block';
    document.getElementById("addPlaylistIcons").style.display = 'none';
});

//The song details will be inside the currentNode section 
function playSong(song) {
    currentSongPlaying = song.currentNode;
    loadSong(song);
    let audioControl = document.getElementById('audioControl');
    audioControl.play();
    audioControl.addEventListener("ended", () => {
        if (song.nextNode)
            playSong(song.nextNode);
    });
}

loadSong();