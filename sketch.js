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
;

  select.changed(function() {
    slider.value(0);
    let songName = select.value();
  
    if (currentSong) {
      currentSong.stop();
    }
  
    currentSong = loadSound(`sounds/${songName}.mp3`, function() {
      currentSong.play();
    });
  });

  slider.input(function() {
    if (currentSong) {
      let seekTime = map(slider.value(), 0, 100, 0, currentSong.duration());
      currentSong.jump(seekTime);
    }
  });

  runtime = createDiv();
  runtime.position(windowWidth / 2 - 50, height - 70);
  runtime.style('font-size', '20px');
  runtime.style('font-family', 'Arial');
  runtime.style('color', 'white');
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
  if (currentSong && !currentSong.isPaused()) {
  let currentTime = currentSong.currentTime().toFixed(2);
  let duration = currentSong.duration().toFixed(2);
  runtime.html(`${currentTime} : ${duration}`);
  } else {
  runtime.html('');
}
}

// cube function
function mycube() {
  push();
  texture(img);
  box(50, 50, 50);
  pop();
}