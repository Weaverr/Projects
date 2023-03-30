let angle = 0;
let fft;
let currentSong;
let img;

function setup() {
  frameRate = 400;
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(80);
  rectMode(CENTER);
  angleMode(DEGREES);
  img = loadImage('face.jpg');
  fft = new p5.FFT();
  

  // song selection
  let select = createSelect();
  select.style('font-size', '22px');
  select.style('font-family', 'Arial');
  select.position(windowWidth / 2 - 90, 10);
  
  select.option("Select a Song:")
  select.option("all");
  select.option("toke");
  select.option("molly");
  select.option("24 songs");
  select.option("pop out");
  select.option("cmon");
  select.option("iloveuihateu");
  select.option("watch this");
  select.option("stop breathing");



  // slider
  slider = createSlider(0, 100, 0);
  slider.position(windowWidth / 2 - 150, height - 100);
  slider.style('width', '300px');
  slider.attribute('disabled', '');

  select.changed(function() {
    slider.value(0);
    let songName = select.value();
  
    if (currentSong) {
      currentSong.stop();
    }
  
    if (songName === "all") {
      let songs = ["toke", "molly", "24 songs", "pop out", "cmon", "iloveuihateu", "watch this", "stop breathing"];
      let index = 0;
      currentSong = loadSound(`sounds/${songs[index]}.mp3`, function() {
        currentSong.play();
      });
      currentSong.onended(function() {
        index++;
        if (index < songs.length) {
          currentSong = loadSound(`sounds/${songs[index]}.mp3`, function() {
            currentSong.play();
          });
        }
      });
    } else {
      slider.value(0);
      currentSong = loadSound(`sounds/${songName}.mp3`, function() {
        currentSong.play();
      });
    }
  });

  slider.input(function() {
    if (currentSong) {
      let seekTime = map(slider.value(), 0, 100, 0, currentSong.duration());
      currentSong.jump(seekTime);
    }
  });
}
  

// key typed
function keyTyped() {
  if (key == 'p') {
    currentSong.pause();

  }
  else if (key == 'r'){
    currentSong.play();
  }
}

// draw function
function draw() {
  background(80);
  camera(100, 100, -100, 0, 0, 0);
  
  let spectrum = fft.analyze();
  let bassLevel = fft.getEnergy("bass");
  
  let vibrationAmount = map(bassLevel, 0, 255, 0, 10);

  angle = angle + 1;
  rotateX(angle + random(-vibrationAmount, vibrationAmount));
  rotateY(angle + random(-vibrationAmount, vibrationAmount));
  mycube();

  if (currentSong && !currentSong.isPaused()) {
    let progress = map(currentSong.currentTime(), 0, currentSong.duration(), 0, 100);
    slider.value(progress);
}
}



// cube function
function mycube() {
  push();
  texture(img);
  box(50, 50, 50);
  pop();
}