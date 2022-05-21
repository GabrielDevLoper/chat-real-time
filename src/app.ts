import { serverHttp } from "./server";
import "./websocket";

serverHttp.listen(3333, () => console.log("Servidor está rodando na porta 3333"));
