const activityForm = document.getElementById('activity-form');
const activitiesList = document.getElementById('activities');

// Global user data
let currentUser = null;
let dashboardData = null;


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
  const completed = document.getElementById('completed').value === 'true';
  const duration = parseInt(document.getElementById('duration').value);
  const activity_type = document.getElementById('activity_type').value;
  const intensity = document.getElementById('intensity').value;
  const distance = document.getElementById('distance').value ? parseFloat(document.getElementById('distance').value) : null;
  const sets = document.getElementById('sets').value ? parseInt(document.getElementById('sets').value) : null;
  const reps = document.getElementById('reps').value ? parseInt(document.getElementById('reps').value) : null;
  const weight = document.getElementById('weight').value ? parseFloat(document.getElementById('weight').value) : null;
  const heart_rate_avg = document.getElementById('heart_rate_avg').value ? parseInt(document.getElementById('heart_rate_avg').value) : null;
  const notes = document.getElementById('notes').value;

  const activity = {
    name,
    date,
    completed,
    duration,
    activity_type,
    intensity,
    distance,
    sets,
    reps,
    weight,
    heart_rate_avg,
    notes
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
    activityForm.reset();
    
    // Show success message
    showNotification('Activity added successfully!', 'success');
  } catch (err) {
    console.error('Error adding activity:', err);
    showNotification('Error adding activity. Please try again.', 'error');
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

  if (activities.length === 0) {
    activitiesList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No activities yet. Add your first activity above!</p>';
    return;
  }

  activities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    const activityDate = new Date(activity.date).toLocaleDateString();
    const activityType = activity.activity_type ? activity.activity_type.charAt(0).toUpperCase() + activity.activity_type.slice(1) : 'Other';
    const intensity = activity.intensity ? activity.intensity.charAt(0).toUpperCase() + activity.intensity.slice(1) : 'Moderate';
    
    let details = `Date: ${activityDate} • Duration: ${activity.duration} min • Calories: ${activity.calories_burned || 0}`;
    if (activity.distance) details += ` • Distance: ${activity.distance} km`;
    if (activity.sets && activity.reps) details += ` • Sets: ${activity.sets} x ${activity.reps}`;
    if (activity.weight) details += ` • Weight: ${activity.weight} kg`;
    
    activityItem.innerHTML = `
      <div class="activity-info">
        <div class="activity-name">${activity.name}</div>
        <div class="activity-details">
          ${details}
        </div>
        <div class="activity-meta">
          <span class="activity-type">${activityType}</span>
          <span class="activity-intensity">${intensity}</span>
          ${activity.notes ? `<div class="activity-notes">${activity.notes}</div>` : ''}
        </div>
      </div>
      <div class="activity-actions">
        <button class="btn btn-primary" onclick="startTimer('${activity._id}', ${activity.duration})" ${activity.completed ? 'disabled' : ''}>
          ${activity.completed ? 'Completed' : 'Start'}
        </button>
        <button class="btn btn-secondary" onclick="deleteActivity('${activity._id}')">Delete</button>
      </div>
    `;

    activitiesList.appendChild(activityItem);
  });
}

// Function to show notifications
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  if (type === 'success') {
    notification.style.backgroundColor = '#28a745';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#dc3545';
  } else {
    notification.style.backgroundColor = '#17a2b8';
  }
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Function to toggle strength training fields
function toggleStrengthFields() {
  const activityType = document.getElementById('activity_type').value;
  const strengthFields = document.getElementById('strength-fields');
  
  if (activityType === 'strength') {
    strengthFields.style.display = 'grid';
  } else {
    strengthFields.style.display = 'none';
  }
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


// Function to fetch user profile data
async function getUserProfile() {
  try {
    const response = await fetch('/api/user/profile');
    if (response.ok) {
      currentUser = await response.json();
      updateUserProfile();
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
  }
}

// Function to fetch dashboard data
async function getDashboardData() {
  try {
    const response = await fetch('/api/user/dashboard');
    if (response.ok) {
      dashboardData = await response.json();
      updateDashboard();
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
  }
}

// Function to update user profile in the UI
function updateUserProfile() {
  if (!currentUser) return;

  // Update greeting
  const greeting = document.querySelector('.greeting');
  if (greeting) {
    greeting.textContent = `Hello, ${currentUser.name}`;
  }

  // Update profile card
  const profileName = document.querySelector('.profile-name');
  if (profileName) {
    profileName.textContent = currentUser.name;
  }

  const profileTitle = document.querySelector('.profile-title');
  if (profileTitle) {
    const activityLevel = currentUser.activity_level.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    profileTitle.textContent = `${activityLevel} User`;
  }

  // Update profile metrics
  const heightBadge = document.querySelector('.metric-badge:nth-child(1) .metric-badge-value');
  if (heightBadge) {
    heightBadge.textContent = `${currentUser.height} cm`;
  }

  const weightBadge = document.querySelector('.metric-badge:nth-child(2) .metric-badge-value');
  if (weightBadge) {
    weightBadge.textContent = `${currentUser.weight} kg`;
  }

  const ageBadge = document.querySelector('.metric-badge:nth-child(3) .metric-badge-value');
  if (ageBadge) {
    ageBadge.textContent = currentUser.age;
  }
}

// Function to update dashboard with real data
function updateDashboard() {
  if (!dashboardData) return;

  // Update metrics cards with real data
  updateMetricsCards();
  
  // Update goals section
  updateGoalsSection();
  
  // Update recent activities
  updateRecentActivities();
}

// Function to update metrics cards
function updateMetricsCards() {
  if (!dashboardData.weeklyStats) return;

  // Update sleep card (mock data for now)
  const sleepValue = document.querySelector('.metric-card:nth-child(1) .metric-value');
  if (sleepValue) {
    sleepValue.textContent = '7.5 Hours'; // This would come from sleep tracking data
  }

  // Update water card (mock data for now)
  const waterValue = document.querySelector('.metric-card:nth-child(2) .metric-value');
  if (waterValue) {
    waterValue.textContent = '2.5 Liters'; // This would come from water tracking data
  }

  // Update steps card with real activity data
  const stepsValue = document.querySelector('.metric-card:nth-child(3) .metric-value');
  if (stepsValue) {
    const totalDuration = dashboardData.weeklyStats.totalDuration;
    const estimatedSteps = Math.round(totalDuration * 100); // Rough estimate: 100 steps per minute
    stepsValue.textContent = `${estimatedSteps} Steps`;
  }
}

// Function to update goals section
function updateGoalsSection() {
  if (!dashboardData.fitnessGoals) return;

  const goalsSection = document.querySelector('.goals-section');
  if (!goalsSection) return;

  // Clear existing goals
  const existingGoals = goalsSection.querySelectorAll('.goal-item');
  existingGoals.forEach(goal => goal.remove());

  // Add real goals
  dashboardData.fitnessGoals.forEach(goal => {
    const goalItem = document.createElement('div');
    goalItem.className = 'goal-item';
    
    const progress = goal.progress || 0;
    const progressWidth = Math.min(progress, 100);
    
    goalItem.innerHTML = `
      <div class="goal-header">
        <span class="goal-name">${goal.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        <span class="goal-progress">${goal.current_value || 0} / ${goal.target_value} ${goal.unit}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressWidth}%"></div>
      </div>
    `;
    
    goalsSection.appendChild(goalItem);
  });
}

// Function to update recent activities
function updateRecentActivities() {
  if (!dashboardData.recentActivities) return;

  const recentActivitiesList = document.getElementById('recent-activities-list');
  if (!recentActivitiesList) return;

  recentActivitiesList.innerHTML = '';

  if (dashboardData.recentActivities.length === 0) {
    recentActivitiesList.innerHTML = '<p style="text-align: center; color: #666; padding: 1rem;">No recent activities. Start your fitness journey!</p>';
    return;
  }

  dashboardData.recentActivities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'recent-activity-item';
    
    const activityDate = new Date(activity.date).toLocaleDateString();
    const activityType = activity.activity_type ? activity.activity_type.charAt(0).toUpperCase() + activity.activity_type.slice(1) : 'Other';
    
    let details = `${activityDate} • ${activity.duration} min • ${activity.calories_burned || 0} cal`;
    if (activity.distance) details += ` • ${activity.distance} km`;
    
    activityItem.innerHTML = `
      <div class="recent-activity-info">
        <div class="recent-activity-name">${activity.name}</div>
        <div class="recent-activity-details">${details}</div>
      </div>
      <div class="recent-activity-badge">${activityType}</div>
    `;

    recentActivitiesList.appendChild(activityItem);
  });
}

// Function to update current date
function updateCurrentDate() {
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

// Event listener for form submission
activityForm.addEventListener('submit', addActivity);

// Event listener for activity type change
document.getElementById('activity_type').addEventListener('change', toggleStrengthFields);

// Profile modal functions
function openProfileModal() {
  if (!currentUser) return;
  
  // Populate form with current user data
  document.getElementById('editName').value = currentUser.name;
  document.getElementById('editAge').value = currentUser.age;
  document.getElementById('editHeight').value = currentUser.height;
  document.getElementById('editWeight').value = currentUser.weight;
  document.getElementById('editActivityLevel').value = currentUser.activity_level;
  
  // Show modal
  document.getElementById('profileModal').style.display = 'flex';
}

function closeProfileModal() {
  document.getElementById('profileModal').style.display = 'none';
}

// Profile form submission
async function updateProfile(event) {
  event.preventDefault();
  
  const profileData = {
    name: document.getElementById('editName').value,
    age: parseInt(document.getElementById('editAge').value),
    height: parseInt(document.getElementById('editHeight').value),
    weight: parseFloat(document.getElementById('editWeight').value),
    activity_level: document.getElementById('editActivityLevel').value
  };
  
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    
    if (response.ok) {
      // Update local user data
      currentUser = { ...currentUser, ...profileData };
      updateUserProfile();
      closeProfileModal();
      showNotification('Profile updated successfully!', 'success');
    } else {
      showNotification('Error updating profile. Please try again.', 'error');
    }
  } catch (err) {
    console.error('Error updating profile:', err);
    showNotification('Error updating profile. Please try again.', 'error');
  }
}

// Event listener for profile form
document.getElementById('profileForm').addEventListener('submit', updateProfile);

// Initialize page
updateCurrentDate();
getUserProfile();
getDashboardData();
getActivities();
