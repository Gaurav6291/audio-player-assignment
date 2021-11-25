let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let audioElement = new Audio('/songs/1.mp3');
let playNow = document.getElementById('playNow');
// console.log(context);
//bars

var obj = {};
function loadBody(){
    let duration = audioElement.duration;
    
    // console.log(audioElement.duration, audioElement.currentTime);
    for(let i=0; i<Math.ceil(duration); i++){
        if(i%2===0){
           let height = Math.ceil(Math.random()*140)+20;
           let y = Math.ceil(Math.random()*40)+60;
           let x = i*5+10;
           obj[i] = [height, y, x];
    context.fillRect(x, y, 6, height);
    context.fillStyle="black";
        }
       
    }
    
}
audioElement.addEventListener('timeupdate', ()=>{
    let currentTime = audioElement.currentTime;
    // console.log(currentTime);
    if(Math.ceil(currentTime)%2===0){
       // console.log(obj, Math.ceil(currentTime))
        for(x in obj){
           if(x == Math.ceil(currentTime)){
               
        context.fillRect(currentTime*5+10, obj[x][1], 5, obj[x][0]);
        context.fillStyle="green";
           }
        }
    }
    
});
canvas.addEventListener('click', (e)=>{
    let d = e.offsetX - (e.offsetX)%10;
    // console.log(obj, d);
    audioElement.currentTime = Math.ceil(d/5);
    audioElement.play();
    for(let i=0; i<Math.ceil(d/5); i++){
        if(i%2===0){
        //    let height = Math.ceil(Math.random()*140)+20;
        //    let y = Math.ceil(Math.random()*40)+60;
        //    let x = i*5+10;
        //    obj[i] = [height, y, x];
        // let k = Math.ceil(d/10)+1
    context.fillRect(obj[i][2], obj[i][1], 6, obj[i][0]);
    context.fillStyle="grey";
        }
       
    }

});


// context.stroke();

//song play/ pause
playNow.addEventListener('click', ()=>{
    
    if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    playNow.classList.add('fa-pause-circle');
    playNow.classList.remove('fa-play-circle');
    }
    else{
        audioElement.pause();
        playNow.classList.add('fa-play-circle');
        playNow.classList.remove('fa-pause-circle');
    }
});
