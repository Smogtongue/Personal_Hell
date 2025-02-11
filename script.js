document.addEventListener("DOMContentLoaded", function() {
    const texts = ["odes", "reates"];
    const baseText = "Zee C";
    let textIndex = 0;
    let charIndex = 0;
    const speed = 150; // typing speed in milliseconds
    let submissionCount = 0; // Track the number of submissions

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

    // Character count functionality for the message textarea
    const messageInput = document.getElementById("message");
    const charCountDisplay = document.createElement("div");
    charCountDisplay.style.position = "relative";
    charCountDisplay.style.textAlign = "right";
    charCountDisplay.style.padding = "0.25rem 2rem";
    charCountDisplay.style.color = "#4b2e2e"; // Chocolate color
    charCountDisplay.style.fontSize = "0.9rem";
    charCountDisplay.innerHTML = "0/1000";
    messageInput.parentElement.appendChild(charCountDisplay);

    messageInput.addEventListener("input", function() {
        const charCount = messageInput.value.length;
        charCountDisplay.innerHTML = `${charCount}/1000`;
        if (charCount > 1000) {
            messageInput.value = messageInput.value.substring(0, 1000);
            charCountDisplay.innerHTML = "1000/1000";
        }
    });

    // Move the character count display above the submission button
    const submitButton = document.querySelector("form button");
    submitButton.parentElement.insertBefore(charCountDisplay, submitButton);

    // Form validation and automatic subject line
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        const emailInput = document.getElementById("email");
        const emailValue = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
            return;
        }

        submissionCount++;
        form.action = `mailto:smogtongue@gmail.com?subject=New Form Submission #${submissionCount}`;
    });
});
