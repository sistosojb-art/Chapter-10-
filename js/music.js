
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("backgroundMusic");
    const btn = document.getElementById("musicToggle");
    const label = document.getElementById("musicLabel");

    if (!audio || !btn) {
        console.error("Music player elements were not found.");
        return;
    }

    // Correct GitHub Pages music location
    audio.src = "assets/music/background.mp3";
    audio.loop = true;
    audio.preload = "auto";
    audio.load();

    function updateLabel(message) {
        if (label) {
            label.textContent = message;
        }
    }

    function showMusicMessage(title, message) {
        if (typeof showMessage === "function") {
            showMessage(title, message);
        } else {
            alert(title + "\n\n" + message);
        }
    }

    btn.addEventListener("click", async () => {
        if (audio.paused) {
            try {
                await audio.play();

                btn.setAttribute("aria-pressed", "true");
                updateLabel("Music on");

            } catch (error) {
                console.error("Music playback error:", error);

                btn.setAttribute("aria-pressed", "false");

                if (error.name === "NotAllowedError") {
                    updateLabel("Tap to play");
                    showMusicMessage(
                        "Playback blocked",
                        "Your browser blocked music playback. Please tap the music button again."
                    );
                } else {
                    updateLabel("Music unavailable");
                    showMusicMessage(
                        "Unable to play music",
                        "The music file could not be played. Please refresh the website and try again."
                    );
                }
            }

        } else {
            audio.pause();

            btn.setAttribute("aria-pressed", "false");
            updateLabel("Music off");
        }
    });

    audio.addEventListener("playing", () => {
        btn.setAttribute("aria-pressed", "true");
        updateLabel("Music on");
    });

    audio.addEventListener("pause", () => {
        btn.setAttribute("aria-pressed", "false");
        updateLabel("Music off");
    });

    audio.addEventListener("error", () => {
        console.error("Audio file failed to load:", audio.error);
        updateLabel("Music unavailable");
    });
});
                          
