// selecting all required tags and elements

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area");
let musicCurrentTime = wrapper.querySelector(".current"),
musicDuration = wrapper.querySelector(".duration"),
musicList = wrapper.querySelector(".music-list");
showMoreBtn = wrapper.querySelector("#more-music"),
hideMoreBtn = musicList.querySelector("#close");


////////////////////////////////////////////////

//calling load music function once window is loaded
// window.addEventListener("load" , ()=>{
//   loadMusic(musicIndex);
//   playingNow();
// })



// load music function
function loadMusic(indexNumb){
   musicName.innerText = allMusic[indexNumb - 1].name;
   musicArtist.innerText = allMusic[indexNumb - 1].artist;
   musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
   mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}


// play music function
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// pause music function
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// next music function
function nextMusic(){
// increment of index by 1
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

// prev music function
function prevMusic(){
musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

///////////////////////////////////////////////////

// play or pause music button event
playPauseBtn.addEventListener("click" , ()=>{
   const isMusicPaused = wrapper.classList.contains("paused");
   //if isMusicPaused is true then call pauseMusic else call playMusic
   isMusicPaused ? pauseMusic() : playMusic();
})

//next music btn event
nextBtn.addEventListener("click" , ()=>{
  nextMusic(); //calling nextMusic function
});

// prev music btn event
prevBtn.addEventListener("click" , ()=>{
 prevMusic();
});

//////////////////////////////////////////////////////////

//update progress bar width according to music current time 
// currentTime
//duration
mainAudio.addEventListener("timeupdate" , (e)=> {
  const currentTime = e.target.currentTime;// getting current time of song
  const duration = e.target.duration;// getting total duration of song
  let progressWidth = (currentTime /duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

////////////////////////////////////////////////////////

// working on timer
// we need loadeddata event to get the duration of audio without playing it.

mainAudio.addEventListener("loadeddata", ()=>{

 //update song total duration
  let audioDuration = mainAudio.duration;
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec = Math.floor(audioDuration % 60);
  if(totalSec < 10){
    totalSec =`0${totalSec}`;
  }
  musicDuration.innerText = `${totalMin}:${totalSec}`; 
});


//update playing song current time
let currentSec = Math.floor(currentTime % 60);
let currentMin = Math.floor(currentTime / 60);
if(currentSec < 10){
 currentSec =`0${currentSec}`;
}
musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//////////////////////////////////////////////////////////

// updating playing song current time  according to the progress bar width
progressArea.addEventListener("click" , (e)=>{
  let progressWidthval = progressArea.clientWidth;// getting width of progress bar
  let clickedOffSetX = e.offsetX; // getting offset x value
  let songDuration = mainAudio.duration;// getting song total duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthval)*songDuration;
  playMusic();
 });

 /////////////////////////////////////////////////////////

 //working on repeat, shuffle song according to the icon

  const repeatBtn = wrapper.querySelector("#repeat-plist");
  repeatBtn.addEventListener("click" , ()=>{
    //first we get the innerText of the icon then we'll change accordingly
    let getText = repeatBtn.innerText; //getting innerText of icon
    //let's do diffrent changes on diffrent icon click using switch

    switch(getText){

    case "repeat" : // if this icon is repeat
      repeatBtn.innerText = "repeat_one";
      break;
      repeatBtn.setAttribute("title", "Song looped");
    case "repeat_one" : // if this icon is repeat_one then change it to shuffle
      repeatBtn.innerText = "shuffle";
      break
      repeatBtn.setAttribute("title", "Playback shuffle");
    case "shuffle" : // if this icon is shuffle then change it to repeat
      repeatBtn.innerText = "repeat";
      break;
      repeatBtn.setAttribute("title", "Playlist looped");
    }
  });

  // working on what to do after the song ended

  mainAudio.addEventListener("ended", ()=>{
    //doing according to the icon if user has set icon to loop song then we'll repeat the current song and will do further accordingly

    let getText = repeatBtn.innerText; //getting innerText of icon
    switch(getText){
      case "repeat":
        nextMusic();
        break;
      case "repeat_one":
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
      case "shuffle": //if icon is shuffle then change it to repeat
      // generating random index between the max range of array length
       let randIndex = Math.floor((Math.random()* allMusic.length) + 1);
      do{
        let randIndex = Math.floor((Math.random()* allMusic.length) + 1);
      }while
      (musicIndex == randIndex);//the loop run until the next random number won't be the same of current music index
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      break;

    }
  });

 // working on play particular song on click



showMoreBtn.addEventListener("click" , ()=>{
  musicList.classList.toggle("show");
});

hideMoreBtn.addEventListener("click" , ()=>{
  showMoreBtn.click();
});









