import getCurrentTime from "./utils/getDate.js";
import messageTemplate from "./utils/messageTemplate.js";

const form = document.querySelector(".chat-form");
const input = document.querySelector(".chat-input input");
const messages = document.querySelector(".chat-messages");

const socket = io();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      message: input.value,
      name: "Jose Garcia",
      date: getCurrentTime(),
      role: "admin",
    });
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const { name, date, message, role } = msg;
  const newMessage = messageTemplate(name, date, message, role);
  messages.append(newMessage);
  messages.scroll(0, 10000);
});
