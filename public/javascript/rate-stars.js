// Get the rating stars container
const ratingStarsContainer = document.getElementById('rating-stars');
// Get all the star elements within the container
const starElements = ratingStarsContainer.querySelectorAll('.fa-star');
// Get the textarea element
const textarea = document.getElementById('textAreaExample');

// Add event listeners to the star elements
starElements.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    highlightStars(index);
  });

  star.addEventListener('click', () => {
    saveRating(index + 1);
    highlightStars(index);
  });
});

// Add event listener to the rate button
const rateButton = document.querySelector('.btn-success');
rateButton.addEventListener('click', () => {
  const rating = getSelectedRating();
  const comment = textarea.value;
  saveRatingandComment(rating, comment);
});

// Function to highlight the stars up to the given index
function highlightStars(index) {
  starElements.forEach((star, i) => {
    if (i <= index) {
      star.classList.add('text-info');
    } else {
      star.classList.remove('text-info');
    }
  });
}

// Function to get the selected rating
function getSelectedRating() {
  let selectedRating = 0;
  starElements.forEach((star, index) => {
    if (star.classList.contains('text-info')) {
      selectedRating = index + 1;
    }
  });
  return selectedRating;
}

// Function to save the rating
function saveRating(rating) {
  console.log('Selected rating:', rating);
}

// Function to save the rating and comment
function saveRatingandComment(rating, comment) {
  const currentURL = window.location.href;
  const restaurant_id = currentURL.split('/').pop();

  const data = {
    rating: rating,
    comment: comment,
    restaurant_id: restaurant_id,
    created_at: new Date().toISOString()
  };

  fetch('/api/ratings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log('Rating saved successfully:', result);
      appendRatingToList(result); // Append the new rating to the list
    })
    .catch(error => {
      console.error('Error saving rating:', error);
      // Handle any errors that occur during the rating saving process
    });
};

function appendRatingToList(newRating) {
  const ratingList = document.getElementById('rating-container');
  const newRatingElement = createRatingElement(newRating); // Create the HTML element for the new rating
  ratingList.appendChild(newRatingElement);
}

function createRatingElement(rating) {
  const ratingElement = document.createElement('div');
  ratingElement.classList.add('rating');
  ratingElement.innerHTML = `
    <p>{{format_date rating.created_at}} {{convertToStarRating rating.rating}}</p>
    <p>{{rating.comment}}</p>
  `;
  return ratingElement;
}

// // Function to get the ratings for the current restaurant
// function createRating(data) {
//   fetch('/api/ratings', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.json())
//   .then(result => {
//     console.log('Rating created successfully:', result);
//     // appendRatingToList(result); // Append the new rating to the list
//   })
//   .catch(error => {
//     console.error('Error creating rating:', error);
//   });
// }

// function updateRating(ratingId, data) {
//   fetch(`/api/ratings/${ratingId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.json())
//   .then(result => {
//     console.log('Rating updated successfully:', result);
//     location.reload();
//   })
//   .catch(error => {
//     console.error('Error updating rating:', error);
//   });
// }

// function getRatingIdFromForm() {
//   // Add code to extract the rating ID from the form, if it exists
//   // For example, you can add a hidden input field in the form to store the rating ID
//   // Retrieve the value of the hidden input field and return it as the rating ID
//   // If the rating ID doesn't exist (indicating a new rating), return null
//   // Example:
//   const ratingIdInput = document.getElementById('ratingIdInput');
//   if (ratingIdInput) {
//     return ratingIdInput.value;
//   } else {
//     return null;
//   }
// }
