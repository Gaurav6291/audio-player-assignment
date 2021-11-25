let canvas = document.getElementById("canvas"); //getting canvas element
let context = canvas.getContext("2d"); //creating context and mentioning the dimension. for eg:- 2D, 3D etc.
let audioElement = new Audio("/songs/1.mp3"); //getting our audio element
let playNow = document.getElementById("playNow"); //getting play button
var obj = {}; //creating a object to store the coordinates and height of the bars.

// part-1 Making Bars

function loadBody() {
  //calling this function from onLoad
  let duration = audioElement.duration; //getting the total duration of the audio(time)
  for (let i = 0; i < Math.ceil(duration); i++) {
    //running a loop from 0 to duration
    if (i % 2 === 0) {
      //we are doing this so that our bar lines will maintain some space between them otherwise they will stick to each other
      let height = Math.ceil(Math.random() * 140) + 40; //random height of our bars and it has minimum of 40 units heights
      let y = Math.ceil(Math.random() * 40) + 60; //random y coordinate for bar line because every bar line may have differnt starting point
      let x = i * 5 + 10; //x - coordinate - every bar should be at equal distance from each other --here every bar will start after 5 units
      obj[i] = [height, y, x]; //storing our x,y and height in the object for further reference
      context.fillStyle = "rgb(232,231,232)"; //filling colour in our bar
      context.fillRect(x, y, 6, height); //it will make a rectangle of having coordinates (x, y), width, and height.
    }
  }
}

// part-2 Moving Bars

audioElement.addEventListener("timeupdate", () => {
  // using eventlistner which runs the callback function every time when the time is changing
  let currentTime = audioElement.currentTime; //getting current time where the audio is currently playing
  if (Math.ceil(currentTime) % 2 === 0) {
    //doing the same thing as we did while making the bars so that it maintain a distance
    for (x in obj) {
      // looping through the object for getting the bar's coordinates and height
      if (x == Math.ceil(currentTime)) {
        //matching the x coordinate of the bar line to our currenttiming
        context.fillRect(currentTime * 5 + 10, obj[x][1], 4, obj[x][0]); //as we get the current point at which audio is playing on the bars,
        context.fillStyle = "rgb(214,182,190)"; // fill the bars upto currentpoint with another color
      }
    }
  }
});

// part-3 Clicking anywhere on the player and move to exact time of the audio

canvas.addEventListener("click", (e) => {
  // using eventlistner which runs the callback function every time when the user is clicking on the player
  let d = e.offsetX - (e.offsetX % 10); //getting the x coordinate of the point where user has clicked
  audioElement.currentTime = Math.ceil(d / 5); //setting the currenttime of the audio to that point
  audioElement.play(); //play the audio
  for (let i = 0; i < Math.ceil(d / 5); i++) {
    //run a loop to that point and change the color of the bars upto that point
    if (i % 2 === 0) {
      context.fillRect(obj[i][2], obj[i][1], 6, obj[i][0]);
      context.fillStyle = "rgb(214,182,190)";
    }
  }
});

// part-4 audio - play/pause
playNow.addEventListener("click", () => {
  // using eventlistner which runs the callback function every time when the user is clicking on the play button
  if (audioElement.paused || audioElement.currentTime <= 0) {
    //if currently audio is not playing the this condition will execute and audio will play
    audioElement.play();
    playNow.classList.add("fa-pause-circle");
    playNow.classList.remove("fa-play-circle");
  } else {
    //else this condition will execute and aur audio will paused
    audioElement.pause();
    playNow.classList.add("fa-play-circle");
    playNow.classList.remove("fa-pause-circle");
  }
});
