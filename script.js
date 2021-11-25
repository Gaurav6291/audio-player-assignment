let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
for(let i=0; i<50; i++){
    if(i%2===0){
context.fillRect(i*5+10, Math.ceil(Math.random()*40)+60, 5, Math.ceil(Math.random()*140)+20);
    }
}
// context.stroke();