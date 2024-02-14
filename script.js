const music = new Audio('songs/PostMalone.wav');

const songs = [
    {
        id: '1',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/1.jpg"
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
        image: "img/3.jpg"
    },

    {
        id: '4',
        songName: `9MM <br>
        <h5>Memphis Cult</h5>`,
        image: "img/4.jpg"
    },

    {
        id: '5',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/5.jpg"
    },

    {
        id: '6',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/6.jpg"
    },

    {
        id: '7',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/7.jpg"
    },

    {
        id: '8',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/8.jpg"
    },

    {
        id: '9',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/9.jpg"
    },

    {
        id: '10',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/10.jpg"
    },

    {
        id: '11',
        songName: `Rock Star <br>
        <h5>Post Malone</h5>`,
        image: "img/11.jpg"
    },

]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].image;
    element.getElementsByTagName('p')[0].innerHTML = songs[i].songName;
    music.play();
})

let masterPlay = document.getElementById('masterPlay');

masterPlay.addEventListener('click', ()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-circle-fill');
        masterPlay.classList.remove('bi-pause-circle-fill');
        console.log(music.paused)
    }
})

const allPlayed = () => {
    Array.from(document.getElementsByClassName('playlist')).forEach((element)=> {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}

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
