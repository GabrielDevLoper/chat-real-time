const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

//emit => emitir alguma informação
//on => escutando alguma informação

// carregando mensagens da sala
socket.emit('select_room', {
    username,
    room
}, messages => {
    messages.forEach(message  => createMessage(message));
});

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room.toUpperCase()}`;

//Enviando menssagem ao pressionar enter e emitindo para o socket
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

// ação do botão enviar e emitindo para o socket
document.getElementById("button_submit").addEventListener("click" , () => {
        const data = {
            room,
            username,
            message: document.getElementById("message_input").value
        }

        socket.emit("message", data);

        document.getElementById("message_input").value = "";
});

//Escutando as menssagens enviadas no metodo acima e adicionando na area das conversas.
socket.on("message", response => {
    console.log(response);

    createMessage(response);
});

document.getElementById("logout").addEventListener("click" , () => {
    const data = {
        room,
        username,
        message: "Saiu da sala"
    }

    socket.emit("message", data);
});

function createMessage(response){
    const { username, message, createdAt, color } = response;

    const messageDiv = document.getElementById("messages");
    messageDiv.innerHTML += `
        <div class="new_message">
            <label for="" class="form-label">
                <strong style="color: #${color}">${username}</strong>: <span> ${message} - ${dayjs(createdAt).format("DD/MM HH:mm")}</span>
            </label>
        </div>    
    `;
}

document.getElementById("logout").addEventListener("click", event => {
    window.location.href = "index.html";
});
