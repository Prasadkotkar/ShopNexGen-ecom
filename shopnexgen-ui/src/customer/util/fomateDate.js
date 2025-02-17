export function formatDate(date) {
  // Define options for formatting
  date = new Date(date);
  const options = {
      weekday: 'short', // Sun
      month: 'short',
      day: '2-digit',
  };

  // Format the date
  return date.toLocaleDateString('en-US', options);
}
