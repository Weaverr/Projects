let angle = 0;
let fft;
let currentSong;
let img;
let volumeSlider;

let songOptions = [  "toke",  "molly",  "24 songs",  "pop out",  "cmon",  "iloveuihateu",  "watch this",  "stop breathing",  "rokstar"];

let albumOptions = [  { name: "up 2 me", artist: "yeat", songs: ["cmon", "morning mudd", "got rich", "let ya know", "stayed tha same", "get busy"] },
  { name: "2 alive", artist: "yeat", songs: ["Song 4", "Song 5", "Song 6"] },
  { name: "lyfe", artist: "yeat", songs: ["Song 7", "Song 8", "Song 9"] },
  { name: "afterlyfe", artist: "yeat", songs: ["Song 7", "Song 8", "Song 9"] },
  { name: "singles", artist: "warwico", songs: ["free mason"] },
];

let artistOptions = [
  { name: "yeat", albums: ["up 2 me", "2 alive", "lyfe", "afterlyfe"] },
  { name: "warwico", albums: ["singles"] },
  { name: "Artist 3", albums: ["x", "x"] },
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
  select.option("Artists");
  select.option("Playlists");
  select.option("Go Back");

  // update options when category is selected
  select.changed(function() {
        let category = select.value();
        if (category === "Songs") {
          currentOptions = songOptions;
          currentCategory = "Songs";
        } else if (category === "Artists") {
          currentOptions = artistOptions.map((artist) => artist.name);
          currentCategory = "Artists";
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
    
    if (category === "Songs" || category === "Albums" || category === "Artists") {
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
  } else if (currentCategory === "Artists") {
    let artist = artistOptions.find((artist) => artist.name === songName);
    if (artist) {
      let songSelect = document.querySelector(".song-select");
      songSelect.remove();
      
      songSelect = createSelect();
      songSelect.class("song-select");
      songSelect.style('font-size', '22px');
      songSelect.style('font-family', 'Arial');
      songSelect.position(windowWidth / 2 - 90, 90);

      songSelect.option("Select an Album:");
      for (let i = 0; i < artist.albums.length; i++) {
        songSelect.option(artist.albums[i]);
      }

      songSelect.changed(function() {
        let albumName = songSelect.value();
        if (currentSong) {
          currentSong.stop();
        }
        let album = albumOptions.find((album) => album.name === albumName && album.artist === songName);
        if (album) {
          let songSelect = document.querySelector(".song-select");
          songSelect.remove();

          songSelect = createSelect();
          songSelect.class("song-select");
          songSelect.style('font-size', '22px');
          songSelect.style('font-family', 'Arial');
          songSelect.position(windowWidth / 2 - 90, 130);

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
      });
    }
  }
});
}
});

volumeSlider = createSlider(0, 1, 0.5, 0.01);
volumeSlider.style('height', '100px');
volumeSlider.style('transform', 'rotate(-90deg)');
volumeSlider.style('position', 'absolute');
volumeSlider.style('left', '10px');
volumeSlider.style('top', `${height - 150}px`);

let volLabel = createDiv("Vol");
volLabel.position(60, height - 190);
volLabel.style('font-size', '20px');
volLabel.style('font-family', 'Arial');
volLabel.style('color', 'white');


// slider
slider = createSlider(0, 100, 0);
slider.position(windowWidth / 2 - 150, height - 100);
slider.style('width', '300px');

slider.input(function() {
  if (currentSong) {
    let newPos = map(slider.value(), 0, 100, 0, currentSong.duration());
    currentSong.jump(newPos);
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

  } else if (key == 'r' && !currentSong.isPlaying()) {
    currentSong.play();
  }
}

text(`Volume: ${volumeSlider.value()}`, windowWidth / 2 - 40, height - 80);

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
    currentSong.setVolume(volumeSlider.value());
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