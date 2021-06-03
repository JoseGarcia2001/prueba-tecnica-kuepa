// Obtener la hora actual formateada

const getCurrentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes}`;
};

export default getCurrentTime;
