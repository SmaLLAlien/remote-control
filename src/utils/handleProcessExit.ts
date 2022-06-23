let isLastMsgAlreadyShowed = false;

export const handleProcessExit = () => {
    if (!isLastMsgAlreadyShowed) {
        process.stdout.write(`Server is closed!\n`);
        isLastMsgAlreadyShowed = true;
    }
};
