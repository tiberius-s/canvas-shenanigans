import Shape from "./shapeClass";

class Rectangle extends Shape {
  constructor(coords, context) {
    super(coords, context);
    this.type = "rectangle";
  }

  contains(point) {
    return (
      this.dimensions.shape.x <= point.x &&
      this.dimensions.shape.x + this.dimensions.shape.w >= point.x &&
      this.dimensions.shape.y <= point.y &&
      this.dimensions.shape.y + this.dimensions.shape.h >= point.y
    );
  }

  draw() {
    this.path = new Path2D();
    this.path.rect(
      this.dimensions.shape.x,
      this.dimensions.shape.y,
      this.dimensions.shape.w,
      this.dimensions.shape.h
    );
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke(this.path);
  }

  getArea() {
    return this.dimensions.shape.w * this.dimensions.shape.h;
  }

  getAreaCoords() {
    return {
      startX: this.startPoint.x,
      startY: this.startPoint.y,
      endX: this.endPoint.x,
      endY: this.endPoint.y
    };
  }

  updateDimensions() {
    const width = this.endPoint.x - this.startPoint.x;
    const height = this.endPoint.y - this.startPoint.y;
    this.dimensions.frame = {
      x: this.startPoint.x,
      y: this.startPoint.y,
      w: Math.round(width),
      h: Math.round(height)
    };
    this.dimensions.shape = Object.assign({}, this.dimensions.frame);
    return this;
  }

  updateCoordinates() {
    this.dimensions.frame = Object.assign(this.dimensions.frame, {
      x: this.startPoint.x,
      y: this.startPoint.y
    });
    this.dimensions.shape = Object.assign({}, this.dimensions.frame);
    return this;
  }
}

export default Rectangle;
