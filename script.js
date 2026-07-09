// ==========================================================
// PROJECT POLARIS
// Version 0.3 - Awakening
// ==========================================================

const progressBar = document.getElementById("progress-bar");
const loadingScreen = document.getElementById("loading-screen");
const introLines = document.querySelectorAll(".intro-line");
const enterButton = document.getElementById("enter-btn");

let progress = 0;

const loadingAnimation = setInterval(() => {

    progress += 1;

    progressBar.style.width = progress + "%";

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
