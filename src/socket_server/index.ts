import { WebSocketServer } from 'ws';

export const socket_server = new WebSocketServer({ port: 8080 });
socket_server.on("listening", () => {
    console.info("*******************************************");
    console.info(`Socket listening on port ${8080}`);
    console.info("*******************************************");
});
