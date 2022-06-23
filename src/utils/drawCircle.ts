import * as robot from "robotjs";

export const drawCircle = (radius: number) => {
    robot.mouseToggle("down");
    const mousePos = robot.getMousePos();
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x - radius + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));

        robot.moveMouse(x, y);
    }
    robot.mouseToggle("up");
    return {radius};
}
