const music = new Audio();

const songs = [
    {
        id: '1',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/1.jpg",
    },

    {
        id: '2',
        songName: `NIGHTMARE <br>
        <h5>SXMPRA</h5>`,
        image: "img/2.jpg"
    },

    {
        id: '3',
        songName: `Bécane <br>
        <h5>Yamê</h5>`,
        image: "img/3.jpg",
    },

    {
        id: '4',
        songName: `9MM <br>
        <h5>Memphis Cult</h5>`,
        image: "img/4.jpg"
    },

    {
        id: '5',
        songName: `Tot Musica <br>
        <h5>Ado</h5>`,
        image: "img/5.jpg"
    },

    {
      id: '6',
      songName: `NIGHTMARE <br>
      <h5>SXMPRA</h5>`,
      image: "img/2.jpg"
    },

    {
      id: '7',
      songName: `Rock Star <br>
      <h5>Post Malone</h5>`,
      image: "img/1.jpg",
    },

    {
      id: '8',
      songName: `9MM <br>
      <h5>Memphis Cult</h5>`,
      image: "img/4.jpg",
    },

    {
      id: '9',
      songName: `Tot Musica <br>
      <h5>Ado</h5>`,
      image: "img/5.jpg",
    },

    {
      id: '10',
      songName: `Bécane <br>
      <h5>Yamê</h5>`,
      image: "img/3.jpg",
    },

];

// Initialize the array
Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].image;
    element.getElementsByTagName('p')[0].innerHTML = songs[i].songName;
    music.play();
})

// Get the play button
let masterPlay = document.getElementById('masterPlay');

// Play/pause
masterPlay.addEventListener('click', ()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-circle-fill');
        masterPlay.classList.remove('bi-pause-circle-fill');
    }
})

let index = 0;
let imageNowPlay = document.getElementById('image-now-play');
let playingNow = document.getElementById('song-now-title');
let title = document.getElementById('title-now');
let nowImage = document.getElementById('now-image');

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    // Add click listener to each songItem
    element.addEventListener('click', () => {
  
      // Update title
      title.innerHTML = songs[i].songName;
      imageNowPlay.src = songs[i].image;

      playingNow.innerHTML = songs[i].songName;
      nowImage.src = songs[i].image;
    });
  });

  const songItems = document.querySelectorAll('.songItem');

// Add click listener to each songItem
songItems.forEach((songItem) => {
    songItem.addEventListener('click', () => {
      // Get the audio element associated with the clicked song
      const audioElement = songItem.querySelector('audio');
      
      // Directly update the audio source and play
      music.src = audioElement.src;
      music.play();
  
      // Update masterPlay icon state
      if (masterPlay) {
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
      }
    });
  });

music.addEventListener('ended', () => {
  if (index < songs.length - 1) {
    index++;
    const nextSongItem = songs[index];
    const nextSongAudio = nextSongItem.querySelector('audio');
  
    // Directly update the audio source and play
    music.src = nextSongAudio.src;
    music.play();

    // Update time displays for the new song
    const durationMinutes = Math.floor(music.duration / 60);
    const durationSeconds = Math.floor(music.duration % 60).toString().padStart(2, '0');
    endTimeDisplay.textContent = `-${durationMinutes}:${durationSeconds}`;
  } else {
    console.error("Invalid song index:", index);
  }
});

// Slider and timers
const songSlider = document.getElementById('song-slider');
const startTimeDisplay = document.getElementById('start-timer');
const endTimeDisplay = document.getElementById('end-timer');

songSlider.addEventListener('input', (event) => {
  const percentage = parseFloat(event.target.value) / 100;
  const currentTime = percentage * music.duration;

  //Fast Forward/Backward
  songSlider.addEventListener('click', (event) => {
  const sliderWidth = songSlider.offsetWidth;
  const clickPosition = event.offsetX;
  const percentage = clickPosition / sliderWidth;
  const newTime = percentage * music.duration;

  // Update music playback time
  music.currentTime = newTime;

  // Update time displays
  updateTimeDisplays(newTime);
});

  // Update start time display
  const startMinutes = Math.floor(currentTime / 60);
  const startSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
  startTimeDisplay.textContent = `${startMinutes}:${startSeconds}`;

  // Update end time display (remaining time)
  const remainingTime = music.duration - currentTime;
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
  endTimeDisplay.textContent = `-${remainingMinutes}:${remainingSeconds}`;
});

setInterval(() => {
  const percentage = (music.currentTime / music.duration) * 100;
  songSlider.value = percentage;

  // Update time displays using current playback time
  const currentTime = music.currentTime;
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
  startTimeDisplay.textContent = `${currentMinutes}:${currentSeconds}`;

  const remainingTime = music.duration - currentTime;
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
  endTimeDisplay.textContent = `-${remainingMinutes}:${remainingSeconds}`;
}, 100);



// VOLUME SLIDER FEATURE
const volumeSlider = document.getElementById('volume-slider');

// Set initial volume to 20%
music.volume = 0.2;

// Set slider value to 20% to match initial volume
volumeSlider.value = 20;

// Event listener for changes on the volume slider
volumeSlider.addEventListener('change', (event) => {
  // Get the new volume value (percentage) from the slider
  const newVolume = parseFloat(event.target.value) / 100;

  // Set the audio element's volume property
  music.volume = newVolume;
});


const playlistHistory = [];

// Function to add played song to the playlist history
function addToPlaylistHistory(song) {
  playlistHistory.unshift(song); // Add the song to the beginning of the array
  if (playlistHistory.length > 3) {
    playlistHistory.pop(); // Remove the oldest song if the array length exceeds 4
  }
  updatePlaylistHistoryUI(); // Update the UI to reflect the changes
}

// Function to update the UI for the playlist history
function updatePlaylistHistoryUI() {
  const historyItems = document.querySelectorAll('.playlist .historyItem');

  playlistHistory.forEach((song, index) => {
    const historyItem = historyItems[index];
    const titleElement = historyItem.querySelector('span');
    titleElement.innerHTML = `
      <span>${song.songName}</span>
      <img src="${song.image}" alt="${song.songName} image">
    `;
  });
}

// Add event listener to update playlist history when a song is clicked
Array.from(document.querySelectorAll('.main-music .songItem')).forEach((element, i) => {
  element.addEventListener('click', () => {
    const selectedSong = {
      songName: songs[i].songName,
      image: songs[i].image // Ensure the song object includes the image property
    };
    addToPlaylistHistory(selectedSong); // Add the clicked song to the playlist history
  });
});

// Event listener for when a song ends to update the next song and playlist history
music.addEventListener('ended', () => {
  if (index < songs.length - 1) {
    index++;
    const nextSongItem = songs[index];
    const nextSongAudio = nextSongItem.querySelector('audio');

    // Update the audio source and play
    music.src = nextSongAudio.src;
    music.play();

    const nextSong = {
      songName: nextSongItem.querySelector('p').textContent,
      artist: nextSongItem.querySelector('audio').getAttribute('src'), // Extract artist information from the audio source
      image: nextSongItem.image // Access the image for the next song
    };
    addToPlaylistHistory(nextSong); // Add the next song to the playlist history

    // Assuming you have a UI element with a class "currentSong" to display the current song's details
    const currentSongElement = document.querySelector('.currentSong');
    currentSongElement.innerHTML = `
      <span>${nextSong.songName}</span>
      <img src="${nextSong.image}" alt="${nextSong.songName} image">
    `;
  } else {
    console.error("Invalid song index:", index);
  }
});