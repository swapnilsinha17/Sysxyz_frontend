
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
export const formatEmployeeCode = (value) => {
  // Remove any non-alphanumeric characters (A-Z, a-z, 0-9)
  let formattedValue = value.replace(/[^A-Za-z0-9]/g, "");

  // Capitalize the string (convert to uppercase)
  formattedValue = formattedValue.toUpperCase();

  return formattedValue;
};