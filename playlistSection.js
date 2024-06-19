let addPlaylistElement = document.getElementById("addPlaylist");
let inputBarDivElement = document.getElementById("inputBarDiv");
let inputBarElement = document.getElementById("inputBar");
let searchPlaylistElement = document.getElementById("searchPlaylistIcon");
let inputPlusIconElement = document.getElementById("inputPlusIcon");
let inputSearchIconElement = document.getElementById("inputSearchIcon");
const clearSearchPlaylistIcon = document.getElementById("clearPlaylistSearchResult");

clearSearchPlaylistIcon.addEventListener("click", () => {
    displayAllPlaylists([...playlistMap.keys()]);
});

const removeIconHTMLTag = '<i class="fa-sharp fa-solid fa-circle-minus"></i>';

let isAddPlaylistClicked = false;
addPlaylistElement.addEventListener("click", () => {
    inputBarDivElement.style.display = 'flex';
    inputBarDivElement.style.transform = 'scale(2,2)';
    inputPlusIconElement.style.display = 'inline-block';
    inputSearchIconElement.style.display = 'none';
    isAddPlaylistClicked = true;
});
searchPlaylistElement.addEventListener("click", () => {
    inputBarDivElement.style.display = 'flex';
    inputBarDivElement.style.transform = 'scale(2,2)';
    inputPlusIconElement.style.display = 'none';
    inputSearchIconElement.style.display = 'inline-block';
    isAddPlaylistClicked = false;
});
inputBarElement.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        if (isAddPlaylistClicked) {
            createPlaylist(inputBarElement.value);
            displayAllPlaylists([...playlistMap.keys()]);
        } else {
            searchPlaylist(inputBarElement.value);
        }
        inputBarDivElement.style.display = 'none';
        inputBarElement.value = '';
    }
});
inputBarDivElement.addEventListener("mouseleave", () => {
    inputBarDivElement.style.display = 'none';
    inputBarElement.value = '';
    isAddPlaylistClicked = false;
});

function createPlaylist(playlistName) {
    if (playlistMap.has(playlistName)) {
        alert(`Playlist : ${playlistName} exists`)
        return;
    }
    playlistMap.set(playlistName, new PlayList());
}

function searchPlaylist(playlistName) {
    if (!playlistMap.has(playlistName)) {
        alert(`${playlistName} - Not Found`);
        return;
    }
    displayAllPlaylists([playlistName]);
}

function displayCurrentPlaylist() {
    if (!currentPlaylistPlaying)
        return;
    let crntCardElement = document.getElementById('currentPlaylist');
    let crntCardHeader = crntCardElement.querySelector('.cardHeader');
    let crntCardCntElement = crntCardElement.querySelector('.cardContent');
    crntCardHeader.textContent = currentPlaylistName;
    clearCardContents(crntCardCntElement);
    let cursorNode = currentPlaylistPlaying.head;
    while (cursorNode) {
        let song = cursorNode.currentNode;
        let { btn, buttonDetail, sideIcon } = createButton(removeIconHTMLTag);
        buttonDetail.textContent = `${song.name} - ${song.artist}`;
        addEventListenersToSongButtonos(btn, sideIcon, cursorNode);
        crntCardCntElement.append(btn);
        cursorNode = cursorNode.nextNode;
    }
}

function addEventListenersToSongButtonos(btn, removeIcon, songNode) {
    btn.addEventListener("click", () => {
        playSong(songNode);
    });
    removeIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        removeSongFromPlaylist(currentPlaylistName, songNode);
        displayCurrentPlaylist();
    });
}

function displayAllPlaylists(playlistNames) {
    let crntCardElement = document.getElementById('playlistCard');
    let crntCardHeader = crntCardElement.querySelector('.cardHeader');
    crntCardHeader.textContent = "";
    let crntCardCntElement = crntCardElement.querySelector('.cardContent');
    clearCardContents(crntCardCntElement);
    if (playlistMap.size == 0)
        return;
    crntCardHeader.textContent = "Playlists";
    for (let playlist of playlistNames) {
        let { btn, buttonDetail, sideIcon } = createButton(removeIconHTMLTag);
        buttonDetail.textContent = `${playlist}`;
        btn.addEventListener("click", () => {
            playPlaylist(playlist);
        });
        sideIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            removePlaylist(playlist);
            displayAllPlaylists([...playlistMap.keys()]);
        });
        crntCardCntElement.append(btn);
    }
}

function playPlaylist(playlistName) {
    currentPlaylistPlaying = playlistMap.get(playlistName);
    currentPlaylistName = playlistName;
    displayCurrentPlaylist();
    if (currentPlaylistPlaying.head)
        playSong(currentPlaylistPlaying.head);
}

function removePlaylist(playlistName) {
    if (!playlistMap.has(playlistName)) {
        alert(`${playlistName} - Doesn't exist`);
        return;
    }
    let playlist = playlistMap.get(playlistName);
    let cursorNode = playlist.head;
    while (cursorNode) {
        cursorNode.currentNode.playlists.delete(playlistName);
        cursorNode = cursorNode.nextNode;
    }
    playlistMap.delete(playlistName);
}

function removeSongFromPlaylist(playlistName, songNode) {
    songNode.currentNode.playlists.delete(playlistName);
    let playlist = playlistMap.get(playlistName);
    playlist.removeNode(songNode);
}

function addSongToPlaylist(playlistName, song) {
    if (song.playlists.has(playlistName)) {
        alert(`Song is already added in ${playlistName}`);
        return;
    }
    song.playlists.add(playlistName);
    playlistMap.get(playlistName).addSong(song);
    if (playlistName == currentPlaylistName)
        displayCurrentPlaylist();
}

displayAllPlaylists([...playlistMap.keys()]);
