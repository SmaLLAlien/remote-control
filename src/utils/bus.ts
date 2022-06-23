import * as robot from "robotjs";
import {drawCircle} from "./drawCircle";
import {drawRectangle} from "./drawRectangle";
import {makeScreenshot} from "./makeScreenshot";

export const bus = async (command: string, commandArgs: string[]) => {
    switch (command) {
        case 'mouse_up': {
            if (commandArgs && commandArgs[0]) {
                const up = commandArgs[0];
                const pos = robot.getMousePos();
                robot.moveMouse(+pos.x, +pos.y - +up);
                return `${command} ${+pos.y - +up}`;
            }
            return command;
        }
        case  'mouse_down': {
            if (commandArgs && commandArgs[0]) {
                const down = commandArgs[0];
                const pos = robot.getMousePos();
                robot.moveMouse(+pos.x, +pos.y + +down);
                return `${command} ${+pos.y + +down}`;
            }
            return command;
        }
        case  'mouse_left': {
            if (commandArgs && commandArgs[0]) {
                const left = commandArgs[0];
                const pos = robot.getMousePos();
                robot.moveMouse(+pos.x - +left, pos.y);
                return `${command} ${+pos.x - +left}`;
            }
            return command;
        }
        case 'mouse_right': {
            if (commandArgs && commandArgs[0]) {
                const right = commandArgs[0];
                const pos = robot.getMousePos();
                robot.moveMouse(+pos.x + +right, pos.y)
                return `${command} ${+pos.x + +right}`;
            }
            return command;
        }

        case 'mouse_position': {
            const pos = robot.getMousePos();
            return `${command} ${pos.x},${pos.y}`;
        }

        case 'draw_circle': {
            if (commandArgs && commandArgs[0]) {
                const radius = +commandArgs[0];
                drawCircle(radius);
            }
            return command;
        }

        case 'draw_rectangle': {
            if (commandArgs && commandArgs?.length >= 2) {
                const horizontal = +commandArgs[0];
                const vertical = +commandArgs[1];
                const {x,y} = drawRectangle(horizontal, vertical);
                return `${command} ${x} ${y}`
            }
            return command;
        }
        case 'draw_square': {
            if (commandArgs && commandArgs[0]) {
                const horizontal = +commandArgs[0];
                const vertical = +commandArgs[0];
                const {x,y} = drawRectangle(horizontal, vertical);
                return `${command} ${x} ${y}`
            }
            return command;
        }
        case 'prnt_scrn': {
            return await makeScreenshot();
        }
    }
}

