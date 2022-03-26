// creating an array and inside this array create object to store song name, artist and etc.

let allMusic = [
  {
    name:"Etefaq",
    artist:"Roozbeh Bemani",
    img:"image-1",
    src:"music-1"
  },
    {
    name:"Yadam Nemire",
    artist:"Babak Jahanbakhsh",
    img:"image-2",
    src:"music-2"
  },
    {
    name:"Adam Barfi",
    artist:"Sina Derakhshande",
    img:"image-3",
    src:"music-3"
  },
    {
    name:"Cheshmat",
    artist:"Kasra Zahedi",
    img:"image-4",
    src:"music-4"
  },
    {
    name:"Toyi Entekhabam",
    artist:"Behnam Bani",
    img:"image-5",
    src:"music-5"
  },
    {
    name:"Shokr",
    artist:"Reza Sadeghi",
    img:"image-6",
    src:"music-6"
  }
];


window.addEventListener("load" , ()=>{
  loadMusic(musicIndex);
  playingNow();
})

let musicIndex = Math.floor((Math.random()* allMusic.length) + 1);


// working on list and playing particular song on click from list

const ulTag = wrapper.querySelector("ul");

 
for ( let i = 0; i < allMusic.length; ++i){
   //passing the song name, artist from the array to li
   // we use li-index="${i} to find which song is currently playing
   let liTag = `<li li-index="${i + 1}">
       <div class="row">
         <span>${allMusic[i].name}</span>
         <p>${allMusic[i].artist}</p>
       </div>
       <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
       <span id="${allMusic[i].src}" class="audio-duration"></span>
     </li>`;

     ulTag.insertAdjacentHTML("beforeend", liTag);

     let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
     let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

       liAudioTag.addEventListener("loadeddata" , ()=>{
         let audioDuration = liAudioTag.duration;
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec = Math.floor(audioDuration % 60);
  if(totalSec < 10){
    totalSec =`0${totalSec}`;
  } 
  liAudioDuration.innerText = `${totalMin}:${totalSec}`;
  liAudioDuration.setAttribute("t-duration" , `${totalMin}:${totalSec}` );
       });
      }


// playing particular song on click

const allLiTags = ulTag.querySelectorAll("li");
function playingNow(){
  for (let j = 0; j < allLiTags.length; j++){
    let audioTag = allLiTags[j].querySelector(".audio-duration")

    if(allLiTags[j].classList.contains("playing")){
      allLiTags[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }


   if(allLiTags[j].getAttribute("li-index") == musicIndex){
     allLiTags[j].classList.add("playing");
     audioTag.innerText = "Playing...";
   }

  //adding on click attribute in all li tags
  allLiTags[j].setAttribute("onclick", "clicked(this)");
}

}
  //lets play song on li click
  function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  
}