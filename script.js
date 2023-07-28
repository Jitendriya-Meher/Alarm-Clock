
const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector(".wrapper h1");

console.log(selectMenu,currentTime);

let alarmTime= "";
let ringtone = new Audio("./assets/ringtone.mp3");
let isAlarmSet = false;

for( let i =12; i>0; i--){
    let val = i<10 ? '0'+i : i;
    let option = `<option value="${val}">${val}</option>`;

    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for( let i =59; i>=0; i--){
    let val = i<10 ? '0'+i : i;
    let option = `<option value="${val}">${val}</option>`;

    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval( () =>{
    // getting time
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if( h>=12){
        h = h-12;
        ampm = "PM";
    }

    // if h is 0, set this value to 12
    h = h == 0 ? 12 : h;
    // macking time to 2 decimal
    h = h<10 ? '0'+h : h;
    m = m<10 ? '0'+m : m;
    s = s<10 ? '0'+s : s;

    console.log(h,m,s,ampm);

    currentTime.innerHTML = `${h} : ${m} : ${s} ${ampm}`;
    console.log(currentTime.innerHTML);
    console.log(alarmTime);

    if( alarmTime == `${h} : ${m} ${ampm}`){
        console.log("Alaram ringing...");
        ringtone.play();
        ringtone.loop = true;
    }else{
        ringtone.pause();
    }

},1000);

const alaram = document.querySelector("button");
const content = document.querySelector(".container");

function setAlaram(){

    if( isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disabled");
        alaram.innerText = "Set Alarm";
        isAlarmSet = false;
        return;
    }

    let time = `${selectMenu[0].value} : ${selectMenu[1].value} ${selectMenu[2].value}`;

    if( time.includes("Hour") || time.includes("Minute") || time.includes("AM?PM") ){
        return alert("Please select a valid time to set alarm");
    }

    alarmTime = time;

    content.classList.add("disabled");
    alaram.innerText = "Clear Alarm";

    isAlarmSet = true;
}

alaram.addEventListener("click",setAlaram);