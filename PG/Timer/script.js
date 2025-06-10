// Sélecteurs
const display = document.getElementById('display');
const minutesInput = document.getElementById('minutes');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const donutCounter = document.getElementById('donut-counter');
const dog = document.getElementById('dog');
const message = document.getElementById('message');
const sound = document.getElementById('success-sound');

// Variables
let interval = null;
let endTime = null;

// ----- Fonctions utiles -----
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateDisplay() {
  const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  display.textContent = formatTime(diff);

  if (diff <= 0) {
    clearInterval(interval);
    interval = null;
    endTime = null;
    localStorage.removeItem('focusdog_end');

    // Mettre à jour les donuts
    let donuts = Number(localStorage.getItem('focusdog_donuts') || 0) + 1;
    localStorage.setItem('focusdog_donuts', donuts);
    donutCounter.textContent = `🍩 ${donuts}`;

    // Animation & son
    dog.classList.add('eat');
    sound.play();
    message.textContent = 'Bravo ! Focus a reçu un donut !';

    setTimeout(() => dog.classList.remove('eat'), 800);
  }
}

// ----- Contrôles -----
function startTimer() {
  if (interval) return; // déjà en cours
  let minutes = parseInt(minutesInput.value, 10) || 25;
  if (!endTime) {
    endTime = Date.now() + minutes * 60 * 1000;
    localStorage.setItem('focusdog_end', endTime);
  }
  interval = setInterval(updateDisplay, 1000);
  message.textContent = 'Concentration en cours…';
}

function pauseTimer() {
  if (!interval) return;
  clearInterval(interval);
  interval = null;
  localStorage.removeItem('focusdog_end');
  // Sauvegarder le temps restant
  const remaining = Math.max(0, endTime - Date.now());
  localStorage.setItem('focusdog_remaining', remaining);
  endTime = null;
  message.textContent = 'En pause';
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  endTime = null;
  localStorage.removeItem('focusdog_end');
  localStorage.removeItem('focusdog_remaining');
  display.textContent = formatTime((parseInt(minutesInput.value, 10) || 25) * 60);
  message.textContent = '';
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;

// ----- Au chargement -----
window.addEventListener('load', () => {
  // Afficher les donuts
  const donuts = Number(localStorage.getItem('focusdog_donuts') || 0);
  donutCounter.textContent = `🍩 ${donuts}`;

  // Reprendre un timer en cours
  const savedEnd = localStorage.getItem('focusdog_end');
  if (savedEnd) {
    endTime = Number(savedEnd);
    updateDisplay();
    interval = setInterval(updateDisplay, 1000);
  } else {
    // Reprendre un timer en pause
    const remaining = Number(localStorage.getItem('focusdog_remaining') || 0);
    if (remaining > 0) {
      endTime = Date.now() + remaining;
      localStorage.setItem('focusdog_end', endTime);
      localStorage.removeItem('focusdog_remaining');
      updateDisplay();
      interval = setInterval(updateDisplay, 1000);
    } else {
      // Aucun timer => afficher valeur par défaut
      display.textContent = formatTime((parseInt(minutesInput.value, 10) || 25) * 60);
    }
  }
});