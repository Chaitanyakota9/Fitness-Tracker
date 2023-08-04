// js/add_exercise_script.js
const exerciseForm = document.getElementById('exercise-form');

// Function to add a new exercise
async function addExercise(event) {
  event.preventDefault();

  const name = document.getElementById('exercise-name').value;
  const description = document.getElementById('exercise-description').value;
  const duration = parseInt(document.getElementById('exercise-duration').value);
  const images = document.getElementById('exercise-images').value.split(',');

  const exercise = {
    name,
    description,
    duration,
    images,
  };

  try {
    await fetch('/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise),
    });
    alert('Exercise added successfully!');
    exerciseForm.reset();
  } catch (err) {
    console.error('Error adding exercise:', err);
  }
}

// Event listener for form submission
exerciseForm.addEventListener('submit', addExercise);
