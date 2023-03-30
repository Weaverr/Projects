let angle = 0;
let fft;
let currentSong;
let img;

let songOptions = [  "toke",  "molly",  "24 songs",  "pop out",  "cmon",  "iloveuihateu",  "watch this",  "stop breathing",  "rokstar"];

let albumOptions = [  { name: "up 2 me", songs: ["cmon", "morning mudd", "Song 3"] },
  { name: "2 alive", songs: ["Song 4", "Song 5", "Song 6"] },
  { name: "lyfe", songs: ["Song 7", "Song 8", "Song 9"] },
  { name: "afterlyfe", songs: ["Song 7", "Song 8", "Song 9"] },
];

let playlistOptions = [  { name: "Playlist 1", songs: ["Song 1", "Song 4", "Song 7"] },
  { name: "Playlist 2", songs: ["Song 2", "Song 5", "Song 8"] },
  { name: "Playlist 3", songs: ["Song 3", "Song 6", "Song 9"] },
];

let currentOptions = [];
let currentCategory = "";

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

  select.option("Select a Category:");
  select.option("Songs");
  select.option("Albums");
  select.option("Playlists");
  select.option("Go Back");

  // update options when category is selected
  select.changed(function() {
    let category = select.value();
    if (category === "Songs") {
      currentOptions = songOptions;
      currentCategory = "Songs";
    } else if (category === "Albums") {
      currentOptions = albumOptions.map((album) => album.name);
      currentCategory = "Albums";
    } else if (category === "Playlists") {
      currentOptions = playlistOptions.map((playlist) => playlist.name);
      currentCategory = "Playlists";
    } else if (category === "Go Back") {
      select.remove();
      setup();
    }

    let songSelect = document.querySelector(".song-select");
    if (songSelect) {
      songSelect.remove();
    }

    // create new select element for songs or albums
    if (category === "Songs" || category === "Albums") {
      songSelect = createSelect();
      songSelect.class("song-select");
      songSelect.style('font-size', '22px');
      songSelect.style('font-family', 'Arial');
      songSelect.position(windowWidth / 2 - 90, 50);

      songSelect.option("Select an Option:");
      for (let i = 0; i < currentOptions.length; i++) {
        songSelect.option(currentOptions[i]);
      }

      songSelect.changed(function() {
        let songName = songSelect.value();
        if (currentSong) {
          currentSong.stop();
        }
        if (currentCategory === "Songs") {
          currentSong = loadSound(`sounds/${songName}.mp3`, function() {
            currentSong.play();
          });
        } else if (currentCategory === "Albums") {
          let album = albumOptions.find((album) => album.name === songName);
          if (album) {
            let songSelect = document.querySelector(".song-select");
            songSelect.remove();

            songSelect = createSelect();
            songSelect.class("song-select");
            songSelect.style('font-size', '22px');
            songSelect.style('font-family', 'Arial');
            songSelect.position(windowWidth / 2 - 90, 90);

            songSelect.option("Select a Song:");
            for (let i = 0; i < album.songs.length; i++) {
              songSelect.option(album.songs[i]);
            }

            songSelect.changed(function() {
              let songName = songSelect.value();
              if (currentSong) {
                currentSong.stop();
              }
              currentSong = loadSound(`sounds/${songName}.mp3`, function() {
                currentSong.play();
              });
            });
          }
        }
      });
    }
  });

  // slider
  slider = createSlider(0, 100, 0);
  slider.position(windowWidth / 2 - 150, height - 100);
  slider.style('width', '300px');

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

  } else if (key == 'r' && !currentSong.isPlaying()) {
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