var second = document.getElementById("second");
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");

function setDate(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) - 90;
    second.style.transform = `rotate(${secondsDegrees}deg)`;
    const minutes = now.getMinutes();
    const minuteDegrees = ((minutes / 60) * 360) - 90;
    minute.style.transform = `rotate(${minuteDegrees}deg)`;
    const hours = now.getHours();
    const hourDegrees = ((hours / 12) * 360) - 90;
    hour.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000)