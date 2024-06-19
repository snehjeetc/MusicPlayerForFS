//All the global constants and global variable goes here
let songs = [
    {
        id: 1,
        name: 'Song1',
        artist: 'Artist1',
        genre: 'Pop',
        img: './resources/images/All_We_Know.png',
        audioSrc: './resources/media/audio/track1.mp3'
    },
    {
        id: 2,
        name: 'Song2',
        artist: 'Artist2',
        genre: 'Hip Hop',
        img: './resources/images/All_We_Know.png',
        audioSrc: './resources/media/audio/track2.mp3'
    },
    {
        id: 3,
        name: 'Song3',
        artist: 'Artist3',
        genre: 'Pop',
        img: './resources/images/All_We_Know.png',
        audioSrc: './resources/media/audio/track3.mp3'
    }, 
    {
        id: 4,
        name: 'Song4',
        artist: 'Artist4',
        genre: 'Rock',
        img: './resources/images/All_We_Know.png',
        audioSrc: './resources/media/audio/track4.mp3'
    }

];

let currentPlaylistPlaying;
let currentPlaylistName = "Playlist1"; 
let currentSongsList; 
let currentSongPlaying; 
let playlistMap = new Map(); 
let genreSet = new Set(songs.map(song => song.genre));
let currentGenre = '';
let songInputSearchBarEnabled = false; 
const cardContentButtonClass = "card-cnt-btns"; 
const cardcontentButtonContentClass = "card-btn-content"; 
const defaultSelectOption = document.createElement('option');
defaultSelectOption.textContent = "Select"; 
songs = songs.map(song => new Song(song.id, song.name, song.artist, song.genre, song.img, song.audioSrc));

function renderPlaylistOptions(playlistOptions) {
    playlistOptions.querySelectorAll('option').forEach(element => element.remove());
    playlistOptions.appendChild(defaultSelectOption); 
    playlistMap.keys().forEach(playlist => {
        let btn = document.createElement('option');
        btn.textContent = playlist;
        playlistOptions.appendChild(btn);
    });
}
