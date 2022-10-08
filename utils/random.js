import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const getSizePipePair = (addToPosX = 0) => {
    let yPosTop = getRandom(300, windowHeight - 300);

    const pipeTop = {
        pos: { x: windowWidth + addToPosX, y: yPosTop - windowHeight },
        size: { height: windowHeight*2 , width: 125 }
    }

    const pipeBottom = {
        pos: { x: windowWidth + addToPosX, y: windowHeight  + 200 + yPosTop },
        size: { height: windowHeight*2 , width: 125 }
    }

    return {
        pipeTop,
        pipeBottom
    }
}

export default getSizePipePair;