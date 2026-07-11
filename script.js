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

const memoryStar1 = document.getElementById("memory-star-1");
const memoryCard = document.getElementById("memory-card");
const closeMemory = document.getElementById("close-memory");

memoryStar1.onclick = function () {

    memoryStar1.classList.add("discovered");

    document.getElementById("memory-counter").textContent =
        "1 / 15 Stars Discovered";

    memoryCard.classList.add("active");
};
closeMemory.onclick = function () {

    memoryCard.classList.remove("active");

};
