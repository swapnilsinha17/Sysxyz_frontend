
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', options);
}



// Capitalize first letter of each word and ensure the rest are lowercase
export function formatCityName(city) {
  return city
    .split(' ')  // Split the string by spaces
    .map(word => {
      // Capitalize first letter and lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');  // Join them back together with spaces
}
