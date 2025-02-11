
let mobile_media_query = window.matchMedia("(max-width: 760px)");
let tablet_media_query = window.matchMedia("(min-width: 481px) and (max-width: 768px)");

let large_desktop_media_query = window.matchMedia("(min-width: 1025px)");


const backgroundMusic = new Audio('music-gamma.mp3');
backgroundMusic.loop = true;
backgroundMusic.style.display = 'none';
document.body.appendChild(backgroundMusic);

const notes = document.querySelectorAll(".js-note");

function recize_notes() {
  for (let note of notes) {
    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.set(note, {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  notes.forEach((note, index) => {
    note.addEventListener("click", function () {
      let heightSettings = {
        mobile: 125 + 40 * index,
        tablet: 80 + 21 * index,
        small_desktop: 75 + 20 * index,
        large_desktop: 70 + 20 * index
      };

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        gsap.set(this, {
          height: "30%",
          clearProps: "all"
        });
      } else {
        notes.forEach(n => {
          if (n.classList.contains("active")) {
            n.classList.remove("active");
            gsap.set(n, {
              height: "30%",
              clearProps: "all"
            });
          }
        });

        this.classList.add("active");

        if (mobile_media_query.matches) {
          gsap.set(this, { height: `${heightSettings.mobile}%` });
        } else if (tablet_media_query.matches) {
          gsap.set(this, { height: `${heightSettings.tablet}%` });
        } else if (small_desktop_media_query.matches) {
          gsap.set(this, { height: `${heightSettings.small_desktop}%` });
        } else {
          gsap.set(this, { height: `${heightSettings.large_desktop}%` });
        }
      }
    });
  });
}

function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

function envelop_transition() {

  backgroundMusic.play().catch(error => {
    console.log("Audio playback failed:", error);
  });

  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });

  const upPaper = document.querySelector(".js-up-paper");
  upPaper.removeEventListener("click", envelop_transition);
  upPaper.classList.remove("cursor");
}

function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");

  const stickerElement = document.querySelector(".js-sticker");
  const upPaper = document.querySelector(".js-up-paper");

  stickerElement.removeEventListener("click", sticker);
  upPaper.addEventListener("click", envelop_transition);
  upPaper.classList.add("cursor");
}


document.querySelector(".js-sticker").addEventListener("click", sticker);


window.addEventListener('resize', recize_notes);


document.body.insertAdjacentHTML('beforeend', audioElement);

document.head.insertAdjacentHTML('beforeend', responsiveStyles);