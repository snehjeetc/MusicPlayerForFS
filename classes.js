class Song {
    id;
    name;
    artist;
    genre;
    img;
    audioSrc;
    playlists; 

    constructor(id, name, artist, genre, img, audioSrc) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.img = img;
        this.audioSrc = audioSrc;
        this.playlists = new Set(); 
    }
}


class SongNode {
    #current;
    #prev;
    #next;

    constructor(current) {
        this.#current = current;
    }

    get previousNode() { return this.#prev; }
    get currentNode() { return this.#current; }
    get nextNode() { return this.#next; }

    set previousNode(prevNode) { this.#prev = prevNode; }
    set nextNode(nextNode) { this.#next = nextNode; }
}

//Implementing A Doubly linked list here
class PlayList {
    #head;
    #tail;

    constructor(...songs) {
        for (let song of songs) {
            let node = new SongNode(song);
            this.add(node);
        }
    }

    get head() { return this.#head; }
    get tail() { return this.#tail; }

    addSong(song){ 
        this.add(new SongNode(song));
    }

    add(node) {
        if (!this.#head) {
            this.#head = node;
            this.#tail = this.#head;
            return;
        }
        if (this.#head === this.#tail) {
            this.#tail = node;
            this.#tail.previousNode = this.#head;
            this.#head.nextNode = this.#tail;
            return;
        }
        let currentTailNode = this.#tail;
        this.#tail = node;
        this.#tail.previousNode = currentTailNode;
        currentTailNode.nextNode = this.#tail;
    }

    removeSong(song) {
        if (!this.#head)
            return false;
        let cursorNode = this.#head;
        while (cursorNode) {
            if (cursorNode.currentNode.id === song.id)
                break;
            cursorNode = cursorNode.nextNode;
        }
        if (!cursorNode)
            return false;
        return this.removeNode(cursorNode);
    }

    removeNode(songNode){ 
        if(!this.#head)
            return false; 
        if (songNode === this.#head) {
            this.#head = this.#head.nextNode;
        } else if (songNode === this.#tail) {
            this.#tail = this.#tail.previousNode;
        } else {
            let nextNode = songNode.nextNode;
            let prevNode = songNode.previousNode;
            prevNode.nextNode = nextNode;
            nextNode.previousNode = prevNode;
        }
        return true;
    }

    filter(predicate){
        let newPlaylist = new PlayList();
        let cursorNode = this.#head; 
        while(cursorNode){ 
            if(predicate(cursorNode.currentNode))
                newPlaylist.addSong(cursorNode.currentNode);
            cursorNode = cursorNode.nextNode;  
        }
        return newPlaylist;
    }
}
