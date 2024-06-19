let songsCard = document.getElementById('songsCard');
let songsCardHeader = songsCard.querySelector('.cardHeader');
let songsCardContent = songsCard.querySelector('.cardContent');
let allSongsList = new PlayList(...songs);

const addIconHTMLTag = ' <span style="text-align: center;"><i class="fa-solid fa-plus"></i>\
<i style="margin-left: -5px;" class="fa-solid fa-list"></i>\
</span>';
const resetSongsSectionElement = document.getElementById("resetSongSectionIcon");
resetSongsSectionElement.addEventListener("click", () => {
    let genreDisplayElement = document.getElementById('selectGenreForm');
    genreDisplayElement.reset();
    currentGenre = "";
    renderSongs(allSongsList);
});

//render a song node 
function renderAllSongs() {
    currentSongsList = allSongsList;
    renderSongs(allSongsList);
}


function createButton(sideIconHtml) {
    let btn = document.createElement('button');
    let buttonDetail = document.createElement('span');
    let sideIcon = document.createElement('span');
    sideIcon.style.display = 'none';
    sideIcon.innerHTML = sideIconHtml;
    btn.className = cardContentButtonClass;
    buttonDetail.className = cardcontentButtonContentClass;
    btn.addEventListener("mouseover", () => {
        sideIcon.style.display = 'inline-block';
    });
    btn.addEventListener("mouseleave", () => {
        sideIcon.style.display = 'none';
    });
    btn.append(buttonDetail, sideIcon);
    return { btn, buttonDetail, sideIcon };
}


function applyFilter(filterVal) {
    let filterResult = songs.filter(song => song.genre === filterVal);
    renderSongs((currentSongsList = new PlayList(...filterResult)));
}

function searchSong(currentSongsList, searchVal) {
    console.log(currentSongsList);
    return renderSongs((currentSongsList = currentSongsList.filter(song => song.name == searchVal || song.artist == searchVal)));
}

function renderSongs(songsList) {
    clearCardContents(songsCardContent);
    let cursorNode = songsList.head;
    while (cursorNode) {
        let { btn, buttonDetail, sideIcon } = createButton(addIconHTMLTag);
        addButtonContents(btn, buttonDetail, cursorNode);
        addSideIconBehavior(sideIcon, cursorNode);
        songsCardContent.append(btn);
        cursorNode = cursorNode.nextNode;
    }
}

function addButtonContents(button, buttonDetail, songNode) {
    let { name, artist } = songNode.currentNode;
    buttonDetail.textContent = `${name} - ${artist}`;
    button.addEventListener("click", () => {
        playSong(songNode);
    });
}

function addSideIconBehavior(addIconElement, songNode) {
    let selectElement = document.createElement("select");
    selectElement.style.display = "none";
    selectElement.addEventListener("change", () => {
        if (selectElement.selectedIndex != 0) {
            addSongToPlaylist(selectElement.value, songNode.currentNode);
            selectElement.style.display = "none";
            addIconElement.firstElementChild.style.display = "inline-block";
        }
    });
    selectElement.addEventListener("click", (e) => { e.stopPropagation(); });
    selectElement.addEventListener("mouseleave", () => {
        selectElement.style.display = "none";
        addIconElement.firstElementChild.style.display = "inline-block";
    });
    addIconElement.appendChild(selectElement);

    addIconElement.firstElementChild.addEventListener("click", (e) => {
        e.stopPropagation();
        addIconElement.firstElementChild.style.display = "none";
        renderPlaylistOptions(selectElement);
        selectElement.style.display = "inline-block";
    });
}

// function createButton(songNode) {
//     console.log("adding buttons");
//     let button = document.createElement('button');
//     let { name, artist } = songNode.currentNode;
//     button.textContent = `${name} - ${artist}`;
//     button.addEventListener("click", () => {
//         playSong(songNode);
//     });
//     console.log("buttons added");
//     return button;
// }

function clearCardContents(cardContent) {
    let lastChild = cardContent.lastElementChild;
    while (lastChild) {
        lastChild.remove();
        lastChild = cardContent.lastElementChild;
    }
}

function loadFilterByOptions(genreSet) {
    let genreDisplayElement = document.getElementById('selectGenre');
    let defaultOptionElement = document.createElement('option');
    defaultOptionElement.textContent = "Select";
    genreDisplayElement.append(defaultOptionElement);
    genreSet.forEach(genre => {
        let optionElement = document.createElement('option');
        optionElement.textContent = genre;
        genreDisplayElement.append(optionElement);
    });
}

function addFilterByFunctionalityEvent() {
    let genreDisplayElement = document.getElementById('selectGenre');
    genreDisplayElement.addEventListener("change", (e) => {
        // console.log("selected", document.querySelector("#selectMovie").value);
        if (currentGenre == genreDisplayElement.value || genreDisplayElement.selectedIndex == 0)
            return;
        currentGenre = genreDisplayElement.value;
        applyFilter(currentGenre);
    });
}

function addSearchButtonEvent() {
    let songSearchIcon = document.getElementById('songSearchIcon');
    songSearchIcon.addEventListener('click', () => {
        let searchBarDiv = document.getElementById('searchBarSong');
        if (!songInputSearchBarEnabled) {
            searchBarDiv.classList.remove('hidden');
            searchBarDiv.style.transform = 'scaleY(1.5)';
        } else {
            searchBarDiv.classList.add('hidden');
        }
        songInputSearchBarEnabled = !songInputSearchBarEnabled;
    });
}

function addSongSearchBarEvent() {
    let searchBarDiv = document.getElementById('searchBarSong');
    let songSearchIcon = document.getElementById('songSearchIcon');
    searchBarDiv.addEventListener('keydown', (e) => {
        if (e.key == "Enter") {
            let searchVal = searchBarDiv.value;
            // console.log(searchVal);
            searchBarDiv.value = '';
            songSearchIcon.dispatchEvent(new Event('click'));
            if (searchVal != '')
                searchSong(currentSongsList, searchVal);
        }
    });
}

loadFilterByOptions(genreSet);
addFilterByFunctionalityEvent();
addSearchButtonEvent();
addSongSearchBarEvent();
renderAllSongs();