// Set the target date for the birthday (May 30, 2026 00:00:00)
// We use the local time zone
const targetDate = new Date(2026, 4, 30, 0, 0, 0).getTime(); // Note: Month is 0-indexed, so 4 is May.

// Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownView = document.getElementById('countdown-view');
const surpriseView = document.getElementById('surprise-view');
const skipBtn = document.getElementById('skip-btn');
const replayBtn = document.getElementById('replay-btn');
const bdayAudio = document.getElementById('bday-audio');

let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        showSurprise();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function showSurprise() {
    countdownView.classList.remove('active');
    countdownView.classList.add('hidden');
    
    setTimeout(() => {
        surpriseView.classList.remove('hidden');
        surpriseView.classList.add('active');
        fireConfetti();
        
        // Play music
        if (bdayAudio) {
            bdayAudio.volume = 0.6; // Slightly lower volume so it's pleasant
            bdayAudio.play().catch(e => console.log("Audio play blocked by browser:", e));
        }
    }, 800); // Wait for fade out
}

function fireConfetti() {
    // A nice celebratory burst
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff9a9e', '#fecfef', '#a1c4fd', '#ffb8d1', '#fff0b3']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff9a9e', '#fecfef', '#a1c4fd', '#ffb8d1', '#fff0b3']
      });
    }, 250);
}

// Event Listeners
skipBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    showSurprise();
});

replayBtn.addEventListener('click', fireConfetti);

// Start Countdown
updateCountdown(); // Initial call
countdownInterval = setInterval(updateCountdown, 1000);
