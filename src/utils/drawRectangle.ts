import * as robot from "robotjs";

export const drawRectangle = (horizontal: number, vertical: number): {x: number, y: number} => {
    robot.mouseToggle("down");
    const {x,y} = robot.getMousePos();
    for (let i = 0; i < horizontal; i+= 1) {
        robot.moveMouse(x + i, y);
    }
    for (let i = 0; i < vertical; i+= 1) {
        robot.moveMouse(x + horizontal, y + i);
    }
    for (let i = 0; i < horizontal; i+= 1) {
        robot.moveMouse(x + horizontal - i, y + vertical);
    }
    for (let i = 0; i < vertical; i+= 1) {
        robot.moveMouse(x, y + vertical - i);
    }
    robot.mouseToggle("up");
    return {x: horizontal, y: vertical};
}
