const Handlebars = require('handlebars');

module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
    
        return word;
    },
    format_url: url => {
        return url
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];
    },
    convertToStarRating: averageRating => {
      let ratingString = '';
      const fullStar = '<i class="fas fa-star text-warning fa-xs"></i>';
      const halfStar = '<i class="fas fa-star-half-alt text-warning fa-xs"></i>';
      const emptyStar = '<i class="far fa-star text-warning fa-xs"></i>';
  
      // Calculate the number of full stars
      const fullStars = Math.floor(averageRating);
      for (let i = 0; i < fullStars; i++) {
        ratingString += fullStar;
      }
  
      // Check if there is a half star
      if (averageRating - fullStars >= 0.5) {
        ratingString += halfStar;
      }
  
      // Fill remaining stars with empty stars
      const remainingStars = 5 - Math.ceil(averageRating);
      for (let i = 0; i < remainingStars; i++) {
        ratingString += emptyStar;
      }
  
      return new Handlebars.SafeString(ratingString);
    }

};