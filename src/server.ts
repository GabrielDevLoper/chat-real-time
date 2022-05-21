import express from "express";
import http from "http";
import { Server} from "socket.io";

const app = express();

//Servidor para rotas padrão protocolo http
const serverHttp = http.createServer(app);

//Servidor para utilizar o socket
const io = new Server(serverHttp);

export { serverHttp, io };