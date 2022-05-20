import express from "express";
import http from "http";

const app = express();

const serverHttp = http.createServer(app);

app.listen(3333, () => console.log("Servidor está rodando na porta 3333"));