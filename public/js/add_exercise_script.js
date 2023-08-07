// js/add_exercise_script.js
const exerciseForm = document.getElementById('exercise-form');

// Function to add a new exercise
async function addExercise(event) {
  event.preventDefault();
  const exercise_name = document.getElementById('exercise-name').value;
  const desc = document.getElementById('exercise-description');

  try {
    const response = await fetch(`api/exercises/${exercise_name}`);

    /*if (!response.ok) {
      const errorData = await response.json();
      desc.innerHTML = `${errorData.message}`;
      return;
    }*/

    const exerciseData = await response.json();
    desc.innerHTML = `${exerciseData.description}`;
    document.getElementById('exercise-duration').value = exerciseData.time;

  } catch (error) {
    desc.innerHTML = `${error.message}`;
  }

  /*try {
    await fetch('/api/exercises', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: exercise_name }),
    });
    const data = await response.json();
    document.getElementById('exercise-description').innerHTML = data.description
  } catch (err) {
    console.error('Error adding exercise:', err);
  }*/
}

// Event listener for form submission
exerciseForm.addEventListener('submit', addExercise);
