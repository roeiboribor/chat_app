const socket = io('ws://localhost:3500');

const sendMessage = (e) => {
    e.preventDefault();
    const messageEl = document.querySelector('#message');

    if (messageEl.value) {
        socket.emit('message', messageEl.value);
        // Reset message box
        messageEl.value = "";
    }

    messageEl.focus();
};

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// Listen For Messages

socket.on("message", (data) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('#message-list').appendChild(li);
})