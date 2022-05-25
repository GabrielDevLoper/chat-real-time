import { io } from "./server";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

interface Message {
    username: string;
    room: string;
    message: string;
    createdAt: Date;
}

const users: RoomUser[] = [];

const messages: Message[] = [];

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
                socket_id: socket.id
            });
        }
        
       const messagesRoom = getMessagesRoom(room);
       callback(messagesRoom);
    });

    socket.on("message", response => {
        const { room, username, message: text } = response;

        //Salvar as mensagens
        const message: Message = {
            room,
            username,
            message: text,
            createdAt: new Date()
        }

        messages.push(message);
        //Enviar para usuarios da sala
        io.to(room).emit("message", message);
    });
});


function getMessagesRoom(room: string){
    const messagesRoom = messages.filter(message => message.room === room);

    return messagesRoom;
}