document.addEventListener("DOMContentLoaded", function() {
    const texts = ["odes", "reates"];
    const baseText = "Zee C";
    let textIndex = 0;
    let charIndex = 0;
    const speed = 150; // typing speed in milliseconds

    function typeEffect() {
        if (charIndex < texts[textIndex].length) {
            document.querySelector("header h1").innerHTML = baseText + texts[textIndex].substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(typeEffect, speed);
        } else {
            setTimeout(deleteEffect, 15000); // Wait for 15 seconds before deleting
        }
    }

    function deleteEffect() {
        if (charIndex >= 0) {
            document.querySelector("header h1").innerHTML = baseText + texts[textIndex].substring(0, charIndex) + '<span class="cursor">|</span>';
            charIndex--;
            setTimeout(deleteEffect, speed);
        } else {
            textIndex = (textIndex + 1) % texts.length; // Switch to the next text
            charIndex = 0; // Reset charIndex for the next text
            typeEffect(); // Re-run the typing effect
        }
    }

    function blinkCursor() {
        const cursor = document.querySelector(".cursor");
        if (cursor) {
            cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
        }
    }

    setInterval(blinkCursor, 500); // Blink cursor every 500ms

    function initialTypeEffect() {
        if (charIndex < baseText.length) {
            document.querySelector("header h1").innerHTML = baseText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(initialTypeEffect, speed);
        } else {
            charIndex = 0; // Reset charIndex for the next text
            setTimeout(typeEffect, speed); // Start the typing effect for "odes" immediately
        }
    }

    // Start the initial typing effect for "Zee C"
    initialTypeEffect();

    // Toggle navigation menu visibility
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");

    hamburger.addEventListener("click", function() {
        navMenu.classList.toggle("visible");
        hamburger.classList.toggle("move-left"); // Move the menu button to the left
    });
});
