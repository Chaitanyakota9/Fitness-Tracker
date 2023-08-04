const activityForm = document.getElementById('activity-form');
const activitiesList = document.getElementById('activities');


// Function to fetch activities from the backend API
async function getActivities() {
  try {
    const response = await fetch('/api/activities', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    displayActivities(data);
  } catch (err) {
    console.error('Error fetching activities:', err);
  }
}

// Function to add a new activity
async function addActivity(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const completed = parseInt(document.getElementById('completed').value);
  const duration = parseInt(document.getElementById('duration').value);

  const activity = {
    name,
    date,
    completed,
    duration
  };

  try {
    await fetch('/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activity)
    });

    // Display the newly added activity on the right side
    getActivities();
    activityForm.reset()
  } catch (err) {
    console.error('Error adding activity:', err);
  }
}

// Function to delete an activity
async function deleteActivity(activityId) {
  console.log("this is deeleted function,,,,........");
  try {
    await fetch(`/api/activities/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getActivities();
  } catch (err) {
    console.error('Error deleting activity:', err);
  }
}

// Function to display activities in the UI
function displayActivities(activities) {
  activitiesList.innerHTML = '';

  activities.forEach(activity => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${activity.name}</strong> - Date: ${activity.date}, Duration: ${activity.duration} min, Calories Burned: ${activity.calories_burned}
      <button onclick="startTimer('${activity._id}', ${activity.duration})" ${activity.completed ? 'disabled' : ''}>${activity.completed ? 'Completed' : 'Start'}</button>
      <button  onclick="deleteActivity('${activity._id}')">Delete</button>
    `;

    activitiesList.appendChild(listItem);
  });
}


// Function to start the timer for an activity
async function startTimer(activityId, duration) {
  // Wait for the specified duration (in milliseconds)
  await new Promise(resolve => setTimeout(resolve, duration * 600));

  // After the timer completes, mark the activity as completed by sending a PATCH request to the backend
  try {
    await fetch(`/api/activities/${activityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ duration: duration })
    });
    
    // Update the UI to indicate that the activity is completed (e.g., change the appearance of the activity)
    // You can also refresh the activities list if needed (getActivities())
  } catch (err) {
    console.error('Error marking activity as completed:', err);
  }
  getActivities();
}


// Event listener for form submission
activityForm.addEventListener('submit', addActivity);

// Fetch activities on page load
getActivities();
