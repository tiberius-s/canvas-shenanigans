import Point from "./../shapes/point";

const move = {
  onMouseDown(scope, coords, e) {
    scope.focusedShape.select().drag().setMoveOffset(coords);
  },
  onMouseMove(scope, coords, e) {
    scope.focusedShape.updateStartPoint(coords).updateCoordinates();
  },
  onMouseUp(scope, coords, e) {
    scope.focusedShape.drop();
  }
};

export default move;
