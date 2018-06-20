import draw from "./draw";
import move from "./move";
import resize from "./resize";

const ActionDispatcher = {
  draw: draw,
  move: move,
  resize: resize
};

export default ActionDispatcher;
