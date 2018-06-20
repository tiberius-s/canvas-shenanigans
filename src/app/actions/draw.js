import ShapeFactory from "./../shapes/shapeFactory";

const draw = {
  onMouseDown(scope, coords) {
    const points = {
      start: coords,
      end: coords
    };
    scope.shape = ShapeFactory(scope.currentDrawShape, points, scope.context);
    scope.shape.updateDimensions();
    scope.maps.push(scope.shape);
  },
  onMouseMove(scope, coords) {
    scope.shape.updateEndPoint(coords).updateDimensions();
  },
  onMouseUp(scope, coords) {
    scope.shape.completeDrawing();
    scope.shape = {};
    scope.maps = scope.maps.filter(scope.removeInvalidShape);
  }
};

export default draw;
