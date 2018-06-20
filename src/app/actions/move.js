import Point from "./../shapes/point";

const move = {
  onMouseDown(scope, coords) {
    scope.selectedShape.select().drag().setMoveOffset(coords);
  },
  onMouseMove(scope, coords) {
    scope.selectedShape.updateStartPoint(coords).updateCoordinates();
  },
  onMouseUp(scope, coords) {
    scope.selectedShape.drop();
  }
};

export default move;
