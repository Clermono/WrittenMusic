let musicMap = {};
let currentAudio = null;
const fadeDuration = 1000;

chrome.storage.local.get("musicMap", (data) => {
  if (data.musicMap) {
    musicMap = data.musicMap;
    console.log("Initial music map loaded:", musicMap);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.musicMap) {
    musicMap = changes.musicMap.newValue;
    console.log("Music map updated:", musicMap);
  }
});

function playTrack(trackURL) {
  const newAudio = new Audio(trackURL);
  const step = 50;
  newAudio.loop = true;
  newAudio.volume = 0;
  newAudio.play().catch(err => console.error("Playback failed:", err));

  if (currentAudio) {
    const oldAudio = currentAudio;
    const fadeStep = (oldAudio.volume || 1) / (fadeDuration / step);
    const fadeOut = setInterval(() => {
      if (oldAudio.volume > fadeStep) {
        oldAudio.volume -= fadeStep;
      } else {
        oldAudio.volume = 0;
        oldAudio.pause();
        clearInterval(fadeOut);
      }
    }, step)
  }

  const fadeInStep = 1 / (fadeDuration / step);
  const fadeIn = setInterval(() => {
    if (newAudio.volume < 1) {
      newAudio.volume = Math.min(1, newAudio.volume + fadeInStep);
    } else {
      clearInterval(fadeIn);
    }
  }, step);

  currentAudio = newAudio;

  // if (currentAudio) {
  //   currentAudio.pause();
  //   currentAudio.currentTime = 0;
  // }

  // const audio = new Audio(trackURL);
  // audio.loop = true;
  // audio.volume = 1;
  // audio.play()
  //   .then(() => console.log("Playback started:", trackURL))
  //   .catch(err => console.error("Playback failed:", err));
  
  // currentAudio = audio;
}

document.addEventListener("keydown", e => {
  console.log("Key pressed:", e.key);
  if (["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    setTimeout(() => {
      const rooms = document.querySelectorAll("#console .room-name");
      const room = rooms[rooms.length - 1];
      if (room) {
        const roomName = room?.textContent.trim();
        console.log("Room name:", roomName);

        if (musicMap[roomName]) {
          const trackURL = musicMap[roomName];

          if (currentAudio && new URL(currentAudio.src).href === new URL(trackURL).href) {
          } else {
            playTrack(trackURL);
            console.log("Playing track:", trackURL);
          }
        }
      }
    }, 750)
  }
});

