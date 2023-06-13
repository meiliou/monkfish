// Function to handle the image click event
async function handleImageClick(event) {
  event.preventDefault();

  // Get the restaurant ID from the clicked image's data-restaurant-id attribute
  const restaurantId = event.target.dataset.restaurantId;
  
  console.log('Clicked image:', event.target); // Log the clicked image element
  console.log('Restaurant ID:', restaurantId);

  // Redirect the user to the single-restaurant page using the restaurant ID
  window.location.href = `/restaurants/${restaurantId}`;
}

// Attach the event listener to the image elements
const restaurantImages = document.querySelectorAll('.restaurant-image');
console.log('Number of image elements:', restaurantImages.length);
restaurantImages.forEach(image => {
  image.addEventListener('click', handleImageClick);
  console.log('Added event listener to image:', image);
});
