let time, circle;
let score = 0;
const colors = ['#E74C3C', '#8E44AD', '#3498DB', '#16A085', '#D35400', '#7F8C8D',];
const board = document.querySelector('#board');


window.onhashchange = navigate;
window.onload = navigate;
board.onclick = event => {
   if (event.target.classList.contains('circle')) {
      score++;
      event.target.remove();
      createRandomCircle();
   }
}


function navigate() {
   let offset = 100;
   let hash = document.location.hash;
   if(hash) {
      let hashVal = hash.split(/=/);

      if(hashVal[0] == "#play") {
         offset = 200;
         time = Number(hashVal[1]);
         
         toggleClasslist()
         startGame();
         createRandomCircle();
      } 

      document.querySelector('.wrap').style.top = `-${offset}%`;
  }
}

function startGame() {
   let timerId = setInterval(()=>{
      if (time != 00) {
         --time;
         if (time < 10) time = '0' + time;
         document.querySelector('#time').innerHTML = '00:' + time;
      } else {
         clearInterval(timerId);
         circle.remove();
         toggleClasslist();
         document.querySelector('.primary').innerHTML = score;
         score = 0;
      }
   },1000)
}

function toggleClasslist() {
   const classes = ['.result', 'h3'];
   for(let clas of classes) {
      document.querySelector(clas).classList.toggle('hide');
   }
}

function createRandomCircle() {
   circle = document.createElement('div');
   
   let size = getRandom(10, 60);
   let {width, height} = board.getBoundingClientRect();
   let x = getRandom(0, width - size);
   let y = getRandom(0, height - size);

   circle.classList.add('circle');
   circle.style.width = size + 'px';
   circle.style.height = size + 'px';
   circle.style.top = y + 'px';
   circle.style.left = x + 'px';
   circle.style.background = getRandom();

   board.append(circle);
}

function getRandom(min, max) {
   if (min != undefined) {
      return Math.round(Math.random() * (max - min) + min);
   } else {
      let index = Math.floor(Math.random() * colors.length);
      return colors[index];
   }
}



