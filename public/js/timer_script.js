// Function to display the countdown timer
function displayTimer(duration) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.innerHTML = `<span id="time-left">${formatTime(duration)}</span>`;
    //document.getElementById('timer-container').appendChild(timerElement);
  
    // Update the timer every second
    let timeLeft = duration * 60; // Convert duration to seconds
    const timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('time-left').innerText = formatTime(minutes, seconds);
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer-container').style.display = 'none'; // Hide the timer page
        // Perform any UI changes to indicate that the timer has completed
      }
  
      timeLeft--;
    }, 1000);
  }
  
  // Helper function to format time as MM:SS
  function formatTime(minutes, seconds = 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  displayTimer(1)
  