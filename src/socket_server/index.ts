import { WebSocketServer } from 'ws';
import {PORT} from "../utils/parseEnv";

export const socket_server = new WebSocketServer({ port: PORT });
socket_server.on("listening", () => {
    console.info("*******************************************");
    console.info(`Socket listening on port ${PORT}`);
    console.info("*******************************************");
});
