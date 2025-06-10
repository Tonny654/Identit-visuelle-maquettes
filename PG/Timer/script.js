 // --- Simple Pomodoro logic ---   
    
    const display = document.getElementById('display');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const resetBtn = document.getElementById('reset');

    let workMinutes = 25;
    let timeLeft = workMinutes * 60; // seconds
    let interval = null;

    function updateDisplay() {
      const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const secs = String(timeLeft % 60).padStart(2, '0');
      display.textContent = `${mins}:${secs}`;
    }

    function tick() {
      if (timeLeft > 0) {
          timeLeft--;
         updateDisplay();
        } else {
    clearInterval(interval);
    alert('Session terminée ! Faites une pause.');

if (timeLeft > 0) {
  timeLeft--;
  updateDisplay();
} else {
  clearInterval(interval);
  alert('Session terminée ! Faites une pause.');
  

  // Incrémenter le compteur de sessions
  let sessions = Number(localStorage.getItem('focus_sessions') || 0);
  localStorage.setItem('focus_sessions', sessions + 1);

  // Incrémenter le compteur de récompenses
  let rewards = Number(localStorage.getItem('focus_rewards') || 0);
  localStorage.setItem('focus_rewards', rewards + 1);
}


    // Incrémenter compteur localStorage
    let sessions = Number(localStorage.getItem('focus_sessions') || 0);
    localStorage.setItem('focus_sessions', sessions + 1);
  }

const audio = document.getElementById('congrats-sound');

// Ajouter l'horodatage à l'historique
let history = JSON.parse(localStorage.getItem('focus_history') || '[]');
history.push(Date.now());
localStorage.setItem('focus_history', JSON.stringify(history));
  

}


    startBtn.onclick = () => {
      if (!interval) interval = setInterval(tick, 1000);
    };
    pauseBtn.onclick = () => {
      clearInterval(interval);
      interval = null;
    };
    resetBtn.onclick = () => {
      clearInterval(interval);
      interval = null;
      timeLeft = workMinutes * 60;
      updateDisplay();
    };

    // initial
    updateDisplay();


  const canvas = document.getElementById('particles-bg');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
    requestAnimationFrame(draw);
  }

  draw();


