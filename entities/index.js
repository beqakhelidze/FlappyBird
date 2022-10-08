import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import getSizePipePair from "../utils/random";
import PointPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedPointPropType";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


export default Restart => {
    let engine = Matter.Engine.create({ enableSleeping: false });

    let world = engine.world;

    world.gravity.y = 0.5;

    const pipeSizePosA = getSizePipePair();

    const pipeSizePosB = getSizePipePair(windowWidth*1);
    
    return {
        physics: { engine, world },

        Bird: Bird(world, "green", { x: 40, y: windowHeight/2 }, { height: 40, width: 57 }),

        ObstacleTop1: Obstacle(world, "ObstacleTop1", "red", pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, "ObstacleBottom1", "blue", pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, "ObstacleTop2", "red", pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, "ObstacleBottom2", "blue", pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),

        Floor: Floor(world, "green", { x: windowWidth / 2, y: windowHeight }, { height: 50, width: windowWidth*2 })
    }
};