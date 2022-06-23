import * as robot from "robotjs";
import Jimp from "jimp";

const getMouseCoordsForScreenshot = (sizeX: number, sizeY: number): {x: number, y: number} => {
    let {x,y} = robot.getMousePos();
    const {width, height} = robot.getScreenSize();

    const allowedXCoord = [sizeX / 2, width - sizeX / 2];
    const allowedYCoord = [sizeY / 2, height - sizeY / 2];

    if (x < allowedXCoord[0]) {
        x = sizeX / 2;
    } else if (x > allowedXCoord[1]) {
        x = width - sizeX / 2;
    }

    if (y < allowedYCoord[0]) {
        y = sizeY / 2;
    } else if (y > allowedYCoord[1]) {
        y = height - sizeY / 2;
    }

    return {x,y};
}

export const makeScreenshot = async (sizeX = 200, sizeY = 200) => {
    try {
        const {x,y} = getMouseCoordsForScreenshot(sizeX, sizeY);

        let rimg = robot.screen.capture(x - sizeX / 2, y - sizeY / 2, sizeX, sizeY);
        for (let i = 0; i < rimg.image.length; i++) {
            if (i % 4 === 0) {
                [rimg.image[i], rimg.image[i + 2]] = [rimg.image[i + 2], rimg.image[i]];
            }
        }
        var jimg = new Jimp(rimg.width, rimg.height);
        jimg.bitmap.data = rimg.image;
        const base64 = await jimg.getBufferAsync(Jimp.MIME_PNG);
        return `prnt_scrn ${base64.toString("base64")}`;
    } catch (e) {
        return `prnt_scrn`;
    }
}
