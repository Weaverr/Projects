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
  
  // Create a new FFT object to analyze the sound
  fft = new p5.FFT();
  
  // Create an input field for the song name and a "Play" button
  let songInput = createInput();
  songInput.style('font-size', '22px');
  songInput.position(width / 2 - 100, height - 100);
  songInput.size(200, 20);
  
  let playButton = createButton("Play");
  playButton.size(100,40)
  playButton.position(width / 2 - 45, height - 70);
  playButton.mousePressed(function() {
    let songName = songInput.value();
    
    // Stop the currently playing sound, if any
    if (currentSong) {
      currentSong.stop();
    }
    
    // Load and play the corresponding sound file
    if (songName === "toke") {
      currentSong = loadSound("toke.mp3", function() {
        currentSong.play();
      });
    } else if (songName === "molly") {
      currentSong = loadSound("molly.mp3", function() {
        currentSong.play();
      });
    } else if (songName == '24 songs') {
      currentSong = loadSound("songs.mp3", function() {
        currentSong.play();
      });
    } else if (songName == 'pop out') {
      currentSong = loadSound("popout.mp3", function() {
        currentSong.play();
      })
    } else if (songName == 'cmon') {
      currentSong = loadSound("cmon.mp3", function() {
        currentSong.play();
      })
    } else if (songName == 'iloveuihateu') {
      currentSong = loadSound("loveuhateu.mp3", function() {
        currentSong.play();
      })
    } else if (songName == 'watch this') {
      currentSong = loadSound("watchthis.mp3", function() {
        currentSong.play();
      })
    } else if (songName == 'stop breathing') {
      currentSong = loadSound("stopbreathing.mp3", function() {
        currentSong.play();
      })
    }
    else {
      alert("Invalid song name!");
    }
  });
}

function keyTyped() {
  if (key == 'p') {
    currentSong.pause();

  }
  else if (key == 'r'){
    currentSong.play();
  }
}


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
}

function mycube() {
  push();
  texture(img);
  box(50, 50, 50);
  pop();
}