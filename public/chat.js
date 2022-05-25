const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

//emit => emitir alguma informação
//on => escutando alguma informação
socket.emit('select_room', {
    username,
    room
}, messages => {
    messages.forEach(message  => createMessage(message));
});

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room.toUpperCase()}`;

//Enviando menssagem e emitindo para o socket
document.getElementById("message_input").addEventListener("keypress" , (event) => {
    if(event.key === "Enter"){
        const message = event.target.value;

        const data = {
            room,
            username,
            message
        }

        socket.emit("message", data);

        event.target.value = "";
    }
});

//Escutando as menssagens enviadas no metodo acima e adicionando na area das conversas.
socket.on("message", response => {
    createMessage(response);
});

function createMessage(response){
    const { username, message, createdAt } = response;

    const messageDiv = document.getElementById("messages");
    messageDiv.innerHTML += `
    <div class="new_message">
                <label for="" class="form-label">
                    <strong>${username}</strong>: <span> ${message} - ${dayjs(createdAt).format("DD/MM HH:mm")}</span>
                </label>
            </div>
    `;
}

document.getElementById("logout").addEventListener("click", event => {
    window.location.href = "index.html";
});
