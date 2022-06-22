import * as Jimp from 'jimp';
import {httpServer} from './src/http_server';
import {socket_server} from './src/socket_server';
import * as robot from 'robotjs';
import {bus} from "./src/utils/bus";


const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

socket_server.on("connection", (ws) => {
    console.log('*******************************************');
    console.log(`Client ${JSON.stringify(ws._socket.address())} connected! Welcome!`);
    console.log('*******************************************');
    ws.on("message", (data) => {
        const packet = data.toString();
        const [command, ...commandArgs] = packet.split(' ');
        console.log(packet, 'packet');
        console.log(command, 'command');
        console.log(commandArgs, 'commandArgs');

        const res = bus(command, commandArgs);
        console.log(res, 11111);
        ws.send(res);
    });

    ws.on('close', () => {
        console.log('*******************************************');
        console.log(`Client ${JSON.stringify(ws._socket.address())} Disconnected! Bye!`);
        console.log('*******************************************');
    });
});

