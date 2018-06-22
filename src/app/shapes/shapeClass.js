import Point from "./point";

class Shape {
  constructor(coords, context) {
    this.id = Date.now();
    this.startPoint = coords.start;
    this.endPoint = coords.end;
    this.moveOffSet = coords.start;
    this.dimensions = { frame: {}, shape: {} };
    this.context = context;
    this.drawing = true;
    this.moving = false;
    this.selected = false;
    this.resizing = false;
    this.path = new Path2D();
    this.strokeStyle = "#000";
  }

  //ABSTRACT METHODS
  contains(point) {
    console.warn(
      "Implement a method to verify if the point coordinates are inside the shape's area"
    );
  }

  draw() {
    console.warn("Implement a method to render the shape");
  }

  getArea() {
    console.warn("Implement a method to return the shapes area in pixels");
  }

  getAreaCoords() {
    console.warn("Implement a method to return the coordinates of the shape");
  }

  updateDimensions() {
    console.warn("Implement a method to update the shape's dimensions and or points");
  }

  updateCoordinates() {
    console.warn("Implement a method to update the shape's location on the canvas");
  }

  //CLASS METHODS
  updateStartPoint(newPoint) {
    const { x, y } = {
      x: newPoint.x - this.moveOffSet.x,
      y: newPoint.y - this.moveOffSet.y
    };
    this.startPoint = new Point(x, y);
    return this;
  }

  setMoveOffset(newPoint) {
    const { x, y } = {
      x: newPoint.x - this.startPoint.x,
      y: newPoint.y - this.startPoint.y
    };
    this.moveOffSet = new Point(x, y);
    return this;
  }

  updateEndPoint(newPoint) {
    this.endPoint = newPoint;
    return this;
  }

  drag() {
    this.moving = true;
    return this;
  }

  drop() {
    this.moving = false;
    return this;
  }

  select() {
    this.selected = true;
    this.strokeStyle = "#C80000";
    return this;
  }

  deselect() {
    this.selected = false;
    this.strokeStyle = "#000";
    return this;
  }

  finishDrawing() {
    this.drawing = false;
    return this;
  }

  inUse() {
    return this.drawing || this.moving || this.resizing;
  }
}

export default Shape;
