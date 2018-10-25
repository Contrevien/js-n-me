window.addEventListener("keydown", function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.drum[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0; //rewind to the start
    audio.play(); //play the audio
    key.classList.add('play');
})

function removeTransition(e) {
    e.target.classList.remove('play');
}

const keys = document.getElementsByClassName('drum');
console.log(keys);
for (var x in keys){
    keys[x].addEventListener("transitionend", removeTransition);
}