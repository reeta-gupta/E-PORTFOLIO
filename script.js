/* ======== NAVBAR SCROLL & ACTIVE LINK ======== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__list a');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px header height
        const sectionId = current.getAttribute('id');

        // Check if a link exists for the current section
        const currentNavLink = document.querySelector('.nav__list a[href*=' + sectionId + ']');

        if (currentNavLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentNavLink.classList.add('active-link');
            } else {
                currentNavLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* Smooth scroll for nav links */
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 58, // Adjust for header
                behavior: 'smooth'
            });
        }
    });
});


/* ======== CUSTOM VIDEO PLAYER CONTROLS ======== */
// YEH POORA CODE BINA KISI CHANGE KE KAAM KAREGA
const video = document.getElementById('video-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const rewindBtn = document.getElementById('rewind-btn');
const forwardBtn = document.getElementById('forward-btn');
const seekBar = document.getElementById('seek-bar');
const muteBtn = document.getElementById('mute-btn');
const volumeBar = document.getElementById('volume-bar');

// Check if video element exists before adding listeners
if (video) {
    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
        }
    });

    // Rewind 5s
    rewindBtn.addEventListener('click', () => {
        video.currentTime -= 5;
    });

    // Forward 5s
    forwardBtn.addEventListener('click', () => {
        video.currentTime += 5;
    });

    // Seek Bar Update
    video.addEventListener('timeupdate', () => {
        // Check for duration to avoid NaN
        if (video.duration) {
            seekBar.value = (video.currentTime / video.duration) * 100;
        }
    });

    // Seek
    seekBar.addEventListener('input', () => {
        // Check for duration to avoid NaN
        if (video.duration) {
            video.currentTime = (seekBar.value / 100) * video.duration;
        }
    });

    // Mute
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
            muteBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
            volumeBar.value = 0;
        } else {
            muteBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
            volumeBar.value = video.volume;
        }
    });

    // Volume
    volumeBar.addEventListener('input', () => {
        video.volume = volumeBar.value;
        if (video.volume === 0) {
            muteBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
        } else {
            muteBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
        }
    });

    // Reset play button when video ends
    video.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
    });
}