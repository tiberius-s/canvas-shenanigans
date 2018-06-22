import ShapeFactory from "./../shapes/shapeFactory";
import SHAPES from "./../shapes/shapes";

const draw = {
  onMouseDown(scope, coords, e) {
    const points = { start: coords, end: coords };
    if (!scope.shapeInProgress) {
      scope.shapeInProgress = ShapeFactory(
        scope.currentDrawShape,
        points,
        scope.context
      );
      scope.shapeInProgress.updateDimensions();
      scope.maps.push(scope.shapeInProgress);
    } else if (e.shiftKey) {
      scope.shapeInProgress.updateEndPoint(coords).updateDimensions();
      finishDrawing.call(scope);
    } else {
      scope.shapeInProgress.updateEndPoint(coords).updateDimensions();
    }
  },

  onMouseMove(scope, coords, e) {
    if (scope.shapeInProgress) {
      scope.shapeInProgress.type === SHAPES.POLYGON
        ? scope.shapeInProgress.updateEndPoint(coords).updateDimensions(true)
        : scope.shapeInProgress.updateEndPoint(coords).updateDimensions();
    }
  },

  onMouseUp(scope, coords, e) {
    if (
      scope.shapeInProgress &&
      scope.shapeInProgress.type !== SHAPES.POLYGON
    ) {
      finishDrawing.call(scope);
    }
  }
};

function finishDrawing() {
  this.shapeInProgress.finishDrawing();
  this.shapeInProgress = undefined;
  this.maps = this.maps.filter(removeInvalidShape);
}

function removeInvalidShape(shape) {
  return shape.getArea() > 300;
}

export default draw;
