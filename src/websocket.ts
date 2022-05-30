import { io } from "./server";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
    userColor: string;
}

interface Message {
    username: string;
    room: string;
    message: string;
    createdAt: Date;
    color: string;
}

const users: RoomUser[] = [];

let messages: Message[] = [];

//emit => emitir alguma informação
//on => escutando alguma informação
io.on("connection", socket => {
    
    socket.on('select_room', (response, callback) => {
        const { room, username } = response;

        //conectando em alguma sala
        socket.join(room);

        const userInRoom = users.find(user => user.username === username && user.room === room);

        if(userInRoom){
            userInRoom.socket_id = socket.id;
        }else {
            users.push({
                room,
                username,
                socket_id: socket.id,
                userColor: Math.floor(Math.random()*16777215).toString(16)
            });
        }
        
       const messagesRoom = getMessagesRoom(room);
       callback(messagesRoom);
    });

    socket.on("message", response => {
        const { room, username, message: text } = response;

        if(text === "/clear-all"){
            messages.map((message, index) => {
                if(message.room === room){
                   delete messages[index];
                }
            });
        }else {
            const userColor = users.find(user => user.username === username)

            //Salvar as mensagens
            const message: Message = {
                room,
                username,
                message: text,
                createdAt: new Date(),
                color: userColor ? userColor.userColor : 'black'
            }
    
            messages.push(message);
            //Enviar para usuarios da sala
            io.to(room).emit("message", message);
        }
    });
});


function getMessagesRoom(room: string){
    const messagesRoom = messages.filter(message => message.room === room);

    return messagesRoom;
}