const socket = new WebSocket('ws://localhost:3000');

const sendMessage = (e) => {
    e.preventDefault();
    const messageEl = document.querySelector('#message');

    if (messageEl.value) {
        socket.send(messageEl.value);
        // Reset message box
        messageEl.value = "";
    }

    messageEl.focus();
};

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// Listen For Messages

socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('#message-list').appendChild(li);
})