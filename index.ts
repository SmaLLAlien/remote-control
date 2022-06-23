import {httpServer} from './src/http_server';
import {socket_server} from './src/socket_server';
import {bus} from "./src/utils/bus";
import { createWebSocketStream } from 'ws';


const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

socket_server.on("connection", (ws) => {
    console.log('*******************************************');
    console.log(`Client ${JSON.stringify(ws._socket.address())} connected! Welcome!`);
    console.log('*******************************************');
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.on('data', async (data) => {
        const packet = data.toString();
        const [command, ...commandArgs] = packet.split(' ');

        const res = await bus(command, commandArgs);
        duplex.write(res)
    })

    ws.on('close', () => {
        console.log('*******************************************');
        console.log(`Client ${JSON.stringify(ws._socket.address())} Disconnected! Bye!`);
        console.log('*******************************************');
    });
});
