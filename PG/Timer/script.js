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
      }
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