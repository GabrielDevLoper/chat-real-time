import express from "express";
import http from "http";
import { Server} from "socket.io";
import path from "path";

const app = express();

//Servidor para rotas padrão protocolo http
const serverHttp = http.createServer(app);

//Servidor para utilizar o socket
const io = new Server(serverHttp);

app.use(express.static(path.join(__dirname, "..", "public")));

export { serverHttp, io };