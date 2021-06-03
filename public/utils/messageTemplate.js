// Estructura del mensaje enviado por los usuarios
// IMPORTANTE evitar usar innerHTML para evitar ataques XSS

const messageTemplate = (name, date, message, role) => {
  const div = document.createElement("div");
  div.classList.add("message-info");

  const pName = document.createElement("p");
  pName.classList.add("name");
  pName.textContent = name;

  const pDate = document.createElement("p");
  pDate.classList.add("date");
  pDate.textContent = date;

  const pRole = document.createElement("p");
  pRole.classList.add("role");
  pRole.textContent = `(${role})`;
  if (role === "Moderador") {
    pRole.classList.add("moderator");
  }

  div.append(pName, pDate, pRole);

  const pMessage = document.createElement("p");
  pMessage.classList.add("message-data");
  pMessage.textContent = message;

  const li = document.createElement("li");
  li.append(div, pMessage);

  return li;
};

export default messageTemplate;
