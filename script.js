/* ==========================================================
   PROJECT POLARIS
   Version 1.0
   Complete JavaScript Rewrite
========================================================== */

"use strict";

/* ==========================================================
   ELEMENT REFERENCES
========================================================== */

const loadingScreen = document.getElementById("loading-screen");
const progressBar = document.getElementById("progress-bar");
const loadingPercent = document.getElementById("loading-percent");

const introScreen = document.getElementById("intro-screen");
const introLines = document.querySelectorAll(".intro-line");
const enterButton = document.getElementById("enter-btn");

const universe = document.getElementById("universe");

const backgroundStars = document.getElementById("background-stars");
const particleLayer = document.getElementById("particle-layer");
const shootingContainer = document.getElementById("shooting-star-container");

const moon = document.getElementById("moon");

const musicButton = document.getElementById("music-toggle");
const music = document.getElementById("background-music");

const memoryCounter = document.getElementById("memory-counter");

const memoryCard = document.getElementById("memory-card");
const closeMemory = document.getElementById("close-memory");

const memoryPhoto = document.getElementById("memory-photo");
const memoryTitle = document.getElementById("memory-title");
const memoryText = document.getElementById("memory-text");

const constellationContainer = document.getElementById("constellation-container");

const endingScreen = document.getElementById("ending-screen");

/* ==========================================================
   MEMORY STAR REFERENCES
========================================================== */

const memoryStars = [];

for (let i = 1; i <= memories.length; i++) {

    const star = document.getElementById(`memory-star-${i}`);

    if (star) {

        memoryStars.push(star);

    }

}

/* ==========================================================
   APP STATE
========================================================== */

const discovered = new Set();

let musicStarted = false;

let shootingInterval = null;

/* ==========================================================
   SMALL HELPERS
========================================================== */

function wait(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

function fadeIn(element, display = "block") {

    element.classList.remove("hidden");

    element.style.display = display;

    element.style.opacity = 0;

    requestAnimationFrame(() => {

        element.style.transition = "opacity 1s ease";

        element.style.opacity = 1;

    });

}

function fadeOut(element) {

    return new Promise(resolve => {

        element.style.transition = "opacity 1s ease";

        element.style.opacity = 0;

        setTimeout(() => {

            element.classList.add("hidden");

            resolve();

        }, 1000);

    });

}

/* ==========================================================
   LOADING SCREEN
========================================================== */

async function playLoadingScreen() {

    let progress = 0;

    while (progress <= 100) {

        progressBar.style.width = progress + "%";

        loadingPercent.textContent = progress + "%";

        await wait(18);

        progress++;

    }

    await wait(500);

    await fadeOut(loadingScreen);

    introScreen.classList.remove("hidden");

}

/* ==========================================================
   INTRO SEQUENCE
========================================================== */

async function playIntroSequence() {

    for (const line of introLines) {

        await wait(700);

        line.style.transition =
            "opacity 1.2s ease, transform 1.2s ease";

        line.style.opacity = 1;

        line.style.transform = "translateY(0)";

    }

    await wait(700);

    enterButton.style.transition =
        "opacity 1s ease, transform 1s ease";

    enterButton.style.opacity = 1;

    enterButton.style.transform = "translateY(0)";

}

/* ==========================================================
   ENTER THE SKY
========================================================== */

async function enterUniverse() {

    enterButton.disabled = true;

    await fadeOut(introScreen);

    universe.classList.remove("hidden");

    generateBackgroundStars();

    startMoonAnimation();

    revealMemoryStars();

    startShootingStars();

}

/* ==========================================================
   BACKGROUND STARS
========================================================== */

function generateBackgroundStars() {

    backgroundStars.innerHTML = "";

    for (let i = 0; i < 250; i++) {

        const star = document.createElement("div");

        star.className = "bg-star";

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        const size = Math.random() * 2 + 1;

        star.style.width = size + "px";

        star.style.height = size + "px";

        star.style.animationDelay =
            Math.random() * 6 + "s";

        backgroundStars.appendChild(star);

    }

}

/* ==========================================================
   MOON
========================================================== */

function startMoonAnimation() {

    moon.style.animation =
        "moonGlow 6s ease-in-out infinite";

}

/* ==========================================================
   MEMORY STAR REVEAL
========================================================== */

async function revealMemoryStars() {

    for (const star of memoryStars) {

        star.style.opacity = 0;

        star.style.transform = "scale(.4)";

    }

    await wait(500);

    for (const star of memoryStars) {

        star.style.transition =
            "opacity .8s ease, transform .8s ease";

        star.style.opacity = 1;

        star.style.transform = "scale(1)";

        await wait(300);

    }

}
/* ==========================================================
   MEMORY SYSTEM
========================================================== */

function initialiseMemoryStars() {

    memoryStars.forEach((star, index) => {

        star.addEventListener("click", () => {

            openMemory(index);

        });

    });

}

/* ==========================================================
   OPEN MEMORY
========================================================== */

function openMemory(index) {

    const memory = memories[index];

    if (!memory) return;

    memoryPhoto.style.opacity = 0;

    memoryPhoto.style.transform = "scale(.95)";

    memoryTitle.textContent = memory.title;

    memoryText.textContent = memory.text;

    memoryPhoto.onload = () => {

        memoryPhoto.style.opacity = 1;

        memoryPhoto.style.transform = "scale(1)";

    };

    memoryPhoto.src = memory.image;

    memoryCard.classList.add("active");

    markDiscovered(index);

}

/* ==========================================================
   CLOSE MEMORY
========================================================== */

function closeMemoryCard() {

    memoryCard.classList.remove("active");

}

closeMemory.addEventListener("click", closeMemoryCard);

memoryCard.addEventListener("click", (event) => {

    if (event.target === memoryCard) {

        closeMemoryCard();

    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMemoryCard();

    }

});

/* ==========================================================
   DISCOVERY SYSTEM
========================================================== */

function markDiscovered(index) {

    if (discovered.has(index)) return;

    discovered.add(index);

    const star = memoryStars[index];

    if (star) {

        star.classList.add("discovered");

    }

    updateCounter();

    if (discovered.size === memories.length) {

        setTimeout(() => {

            beginConstellationSequence();

        }, 1200);

    }

}

/* ==========================================================
   COUNTER
========================================================== */

function updateCounter() {

    memoryCounter.textContent =
        `${discovered.size} / ${memories.length} Stars Discovered`;

}

/* ==========================================================
   MUSIC
========================================================== */

musicButton.addEventListener("click", () => {

    if (!musicStarted) {

        music.play();

        musicStarted = true;

        musicButton.textContent = "❚❚";

        return;

    }

    if (music.paused) {

        music.play();

        musicButton.textContent = "❚❚";

    }

    else {

        music.pause();

        musicButton.textContent = "♫";

    }

});

/* ==========================================================
   AUTOPLAY AFTER BEGIN
========================================================== */

enterButton.addEventListener("click", async () => {

    if (!musicStarted) {

        try {

            await music.play();

            musicStarted = true;

            musicButton.textContent = "❚❚";

        }

        catch (error) {

            // Browser blocked autoplay.
            // User can start it manually.

        }

    }

});

/* ==========================================================
   SHOOTING STARS
========================================================== */

function createShootingStar() {

    const meteor = document.createElement("div");

    meteor.className = "shooting-star";

    meteor.style.top = Math.random() * 40 + "%";

    meteor.style.left = 100 + Math.random() * 20 + "%";

    meteor.style.animationDuration =
        (2 + Math.random()) + "s";

    shootingContainer.appendChild(meteor);

    meteor.addEventListener("animationend", () => {

        meteor.remove();

    });

}

function startShootingStars() {

    if (shootingInterval) {

        clearInterval(shootingInterval);

    }

    shootingInterval = setInterval(() => {

        createShootingStar();

    }, 5000);

}
/* ==========================================================
   CONSTELLATION SEQUENCE
========================================================== */

const constellationPattern = [

    { x: 18, y: 70 },
    { x: 28, y: 58 },
    { x: 38, y: 52 },
    { x: 48, y: 40 },
    { x: 58, y: 34 },
    { x: 68, y: 28 },
    { x: 76, y: 18 }

];

async function beginConstellationSequence() {

    if (beginConstellationSequence.started) return;

    beginConstellationSequence.started = true;

    constellationContainer.innerHTML = "";

    const stars = [];

    for (const point of constellationPattern) {

        const star = document.createElement("div");

        star.className = "constellation-star";

        star.style.left = point.x + "%";
        star.style.top = point.y + "%";

        constellationContainer.appendChild(star);

        stars.push(star);

    }

    for (let i = 0; i < stars.length; i++) {

        stars[i].classList.add("show");

        if (i > 0) {

            drawConstellationLine(
                constellationPattern[i - 1],
                constellationPattern[i]
            );

        }

        await wait(constellation.revealSpeed);

    }

    await wait(3000);

    showEndingScreen();

}

/* ==========================================================
   DRAW CONSTELLATION LINE
========================================================== */

function drawConstellationLine(start, end) {

    const line = document.createElement("div");

    line.className = "constellation-line";

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    const length = Math.sqrt(dx * dx + dy * dy);

    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    line.style.left = start.x + "%";
    line.style.top = start.y + "%";

    line.style.width = length + "%";

    line.style.transform =
        `rotate(${angle}deg) scaleX(0)`;

    constellationContainer.appendChild(line);

    requestAnimationFrame(() => {

        line.classList.add("show");

    });

}

/* ==========================================================
   ENDING
========================================================== */

async function showEndingScreen() {

    await fadeOut(universe);

    endingScreen.classList.remove("hidden");

    endingScreen.style.opacity = 0;

    requestAnimationFrame(() => {

        endingScreen.style.transition =
            "opacity 2s ease";

        endingScreen.style.opacity = 1;

    });

}

/* ==========================================================
   INITIALISATION
========================================================== */

async function initialise() {

    updateCounter();

    initialiseMemoryStars();

    await playLoadingScreen();

    await playIntroSequence();

}

enterButton.addEventListener("click", enterUniverse);

window.addEventListener("load", initialise);
