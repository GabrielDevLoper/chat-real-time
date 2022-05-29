import { serverHttp } from "./server";
import "./websocket";

serverHttp.listen(process.env.PORT || 3333, () => console.log("Servidor está rodando na porta 3333"));
