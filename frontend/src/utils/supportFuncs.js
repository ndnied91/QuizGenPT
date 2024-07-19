export const transformDate = (dateString) => {
  const date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  return `${month}/${day}/${year} ${strTime}`;
};
