// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle edit button click
    const editButtons = document.querySelectorAll('.btn-primary');
    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Add your logic to handle edit button click
        // ...
      });
    });
  
    // Handle create post button click
    const createPostButton = document.querySelector('.btn-success');
    createPostButton.addEventListener('click', () => {
      // Add your logic to handle create post button click
      // ...
    });
  
    // Make an AJAX request
    fetch('/api/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        // ...
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  });
  