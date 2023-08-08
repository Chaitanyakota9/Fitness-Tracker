// js/add_exercise_script.js
async function StartExercise() {
  event.preventDefault();
  const time = document.getElementById('exercise-duration').value;
  startTimer(time)
}

async function startTimer(duration) {
  // Wait for the specified duration (in milliseconds)
  await new Promise(resolve => setTimeout(resolve, duration * 600));
  console.log("time up")
}

async function getExerciseInfo(exerciseName) {
  const response = await fetch(`api/exercises/${exerciseName}`);
  const data = await response.json();
  return data;
}

function displayExercises(category) {
  const exerciseListDiv = document.getElementById('exerciseList');
  exerciseListDiv.innerHTML = '';

  const exercises = {
    leg: ['Tadasana', 'Exercise 2', 'Exercise 3'],
    hand: ['Exercise 4', 'Exercise 5'],
    head: ['Exercise 6', 'Exercise 7'],
    backbone: ['Exercise 8', 'Exercise 9', 'Exercise 10'],
    neck: ['Exercise 11', 'Exercise 12']
  };

  exercises[category].forEach(async (exercise) => {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise';
    
    const exerciseButton = document.createElement('button');
    exerciseButton.type = 'button';
    exerciseButton.className = 'exercise-button';
    exerciseButton.textContent = exercise;
    exerciseButton.addEventListener('click', async () => {
      const exerciseData = await getExerciseInfo(exercise);
      const exerciseDescriptionDiv = document.getElementById('exercise-description');
      exerciseDescriptionDiv.innerHTML = `${exerciseData.description}`;
      document.getElementById('exercise-duration').value = exerciseData.time;
    });

    exerciseDiv.appendChild(exerciseButton);
    exerciseListDiv.appendChild(exerciseDiv);
  });
}

// Event listener for form submission
// exerciseForm.addEventListener('submit', StartExercise);
