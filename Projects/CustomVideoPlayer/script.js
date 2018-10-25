const video = document.querySelector('video');
const viewer = document.querySelector('.viewer');
const play = document.querySelector('.toggle');
const skippers = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type=range]');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const fullscreen = document.querySelector('.fullscreen');

function togglePlay() {
    if(video.paused) {
        video.play();
        //play.innerHTML = "⏸";
    } else {
        video.pause();
        //play.innerHTML = "►";
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '⏸';
    play.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


play.addEventListener('click', togglePlay);
viewer.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skippers.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
