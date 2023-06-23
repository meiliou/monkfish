const editRating = document.querySelectorAll('.edit-rating');
editRating.forEach(icon => {
  icon.addEventListener('click', function(event) {
    event.preventDefault();
    const ratingId = this.getAttribute('data-rating-id');
    console.log('Event listener triggered. Rating ID:', ratingId);
    // Perform actions to populate the form with the current rating data for editing
    // You can fetch the rating data from the server using the ratingId and populate the form fields accordingly
    repopulateForm(ratingId);

    // // Store the rating element being edited
    // editedRatingElement = this.closest('.d-flex.flex-start');
    // // Remove the rating element from the DOM
    // editedRatingElement.remove();
  });
});

function repopulateForm(ratingId) {
  console.log('Fetching rating data for ID:', ratingId);
  // Perform an AJAX request to fetch the rating data based on the ratingId
  fetch(`/api/ratings/${ratingId}`)
    .then(response => response.json())
    .then(ratingData => {
        console.log('Retrieved rating data:', ratingData);
        // Populate the form fields with the retrieved rating data
        const rating = ratingData.rating;
        const comment = ratingData.comment;

        // Set the star rating container with the converted star rating HTML
        setStarRating(rating);
        
        const commentTextarea = document.getElementById('textAreaExample');
        commentTextarea.value = comment;

        // Set the value of the hidden input field with the rating ID
        const ratingIdInput = document.getElementById('ratingIdInput');
        if (ratingIdInput) {
            ratingIdInput.value = ratingId;
        }
    })
    .catch(error => {
      console.error('Error fetching rating data:', error);
      // Handle any errors that occur during the data fetching process
    });
}

function setStarRating(rating) {
    starElements.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('text-info');
      } else {
        star.classList.remove('text-info');
      }
    });
}