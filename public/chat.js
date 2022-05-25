const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');


//emit => emitir alguma informação
//on => escutando alguma informação
socket.emit('select_room', {
    username,
    room
});

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

socket.on("message", response => {
    console.log(response);
});

