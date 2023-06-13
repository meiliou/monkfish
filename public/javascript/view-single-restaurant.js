// Function to handle the image click event
// async function imageClickHandler(event) {
//   event.preventDefault();

//   // Get the restaurant ID from the clicked image's data-restaurant-id attribute
// const restaurantData = JSON.parse(event.target.getAttribute('data-restaurant'));
// console.log('Restaurant Data:', restaurantData);
// console.log('Attribute Value:', event.target.getAttribute('data-restaurant'));

// const restaurantId = event.target.getAttribute('data-restaurant');
//   console.log('Restaurant ID:', restaurantId);
//   console.log('Attribute Value:', event.target.getAttribute('data-restaurant'))
//     // Trim the restaurant ID and convert it to a number
//     const trimmedRestaurantId = restaurantId.trim();
//     const parsedRestaurantId = parseInt(trimmedRestaurantId, 10);
//     console.log('Parsed restaurant ID:', parsedRestaurantId);
    
//       // Check if the parsed restaurant ID is a valid number
//   if (!isNaN(parsedRestaurantId)) {
//     // Redirect the user to the single-restaurant page using the restaurant ID
//     window.location.href = `/restaurant/${parsedRestaurantId}`;
//   } else {
//     console.error('Invalid restaurant ID:', restaurantId);
//   }
// };

// //   // Redirect the user to the single-restaurant page using the restaurant ID
//   console.log('Before redirection');
//   window.location.href = `/restaurant/${restaurantId}`;
//   console.log('After redirection');
// };

// Attach the event listener to the image elements
// const restaurantImages = document.querySelectorAll('.restaurant-image');
// console.log('Number of image elements:', restaurantImages.length);
// restaurantImages.forEach(image => {
//   image.addEventListener('click', imageClickHandler);
//   console.log('Added event listener to image:', image);
// });
