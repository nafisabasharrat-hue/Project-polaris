// ==========================================================
// PROJECT POLARIS
// Version 0.3 - Awakening
// ==========================================================

const progressBar = document.getElementById("progress-bar");
const loadingPercent = document.getElementById("loading-percent");
const loadingScreen = document.getElementById("loading-screen");
const introLines = document.querySelectorAll(".intro-line");
const enterButton = document.getElementById("enter-btn");

let progress = 0;

const loadingAnimation = setInterval(() => {

    progress += 1;

    progressBar.style.width = progress + "%";
    loadingPercent.textContent = progress + "%";
    if (progress >= 100) {

        clearInterval(loadingAnimation);

        setTimeout(() => {

            loadingScreen.style.opacity = "0";

            setTimeout(() => {

                loadingScreen.style.display = "none";
                
                document.getElementById("intro-screen").classList.remove("hidden");
                
                showIntro();

            }, 1500);

        }, 400);

    }

}, 35);


function showIntro() {

    introLines.forEach((line, index) => {

        setTimeout(() => {

            line.style.opacity = "1";

            line.style.transform = "translateY(0)";

            line.style.transition =
                "opacity 1.6s ease, transform 1.6s ease";

        }, index * 1800);

    }); 

    setTimeout(() => {

        enterButton.style.opacity = "1"; 
        
        enterButton.style.transform = "translateY(0)";

    }, introLines.length * 1800 + 500);

}

// ==========================================================
// BACKGROUND STARS
// ==========================================================

const starContainer = document.getElementById("background-stars");

const SAFE_ZONE = {

    left:25,

    right:75,

    top:18,

    bottom:72

};

for(let i=0;i<30;i++){

    const star=document.createElement("div");

    star.className="bg-star";

    let x;
    let y;

    do{

        x=Math.random()*100;
        y=Math.random()*100;

    }

    while(

        x>SAFE_ZONE.left &&
        x<SAFE_ZONE.right &&
        y>SAFE_ZONE.top &&
        y<SAFE_ZONE.bottom

    );

    star.style.left=x+"%";
    star.style.top=y+"%";

    star.style.opacity=(0.2+Math.random()*0.6);

    star.style.animationDelay=
        (Math.random()*5)+"s";

    star.style.width=
        (1+Math.random()*2)+"px";

    star.style.height=
        star.style.width;

    starContainer.appendChild(star);

}

enterButton.addEventListener("click", () => {

    document.getElementById("intro-screen").style.display = "none";

    document.getElementById("universe").classList.remove("hidden");

});

// ==========================================================
// FIRST MEMORY
// ==========================================================

const memoryCard = document.getElementById("memory-card");
const memoryTitle = document.getElementById("memory-title");
const memoryText = document.getElementById("memory-text");
const memoryPhoto = document.getElementById("memory-photo");
const closeMemory = document.getElementById("close-memory");
const counter = document.getElementById("memory-counter");

const stars = document.querySelectorAll(".memory-star");

let discoveredStars = 0;

stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        const memory = memories[index];

        memoryTitle.textContent = memory.title;
        memoryText.textContent = memory.text;
        memoryPhoto.src = memory.image;

        if (!star.classList.contains("discovered")) {

            star.classList.add("discovered");

            discoveredStars++;

            counter.textContent =
                `${discoveredStars} / 15 Stars Discovered`;
        }

        memoryCard.classList.add("active");

    });

});

closeMemory.addEventListener("click", () => {

    memoryCard.classList.remove("active");

});
// ==========================================================
// SHOOTING STARS
// ==========================================================

const shootingContainer = document.getElementById("shooting-star-container");

function createShootingStar(){

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.top = Math.random() * 35 + "%";
    star.style.left = "110%";

    shootingContainer.appendChild(star);

    setTimeout(() => {

        star.remove();

    },1800);

}

function startMeteor(){

    createShootingStar();

    const next =
        4000 + Math.random()*5000;

    setTimeout(startMeteor,next);

}

startMeteor();
