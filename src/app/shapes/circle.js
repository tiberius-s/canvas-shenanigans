import Shape from "./shapeClass";

class Circle extends Shape {
  constructor(coords, context) {
    super(coords, context);
    this.type = "circle";
  }

  draw() {

    // this.context.strokeRect(
    //   this.dimensions.frame.x,
    //   this.dimensions.frame.y,
    //   this.dimensions.frame.w,
    //   this.dimensions.frame.h
    // );
    this.path = new Path2D();
    this.path.arc(
      this.dimensions.shape.cx,
      this.dimensions.shape.cy,
      Math.abs(this.dimensions.shape.r),
      0,
      2 * Math.PI,
      false
    );
    this.path.closePath();
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke(this.path);
  }

  getArea() {
    const { r } = this.getAreaCoords();
    return Math.round(Math.PI * Math.pow(r, 2));
  }

  getAreaCoords() {
    return {
      cx: this.dimensions.shape.cx,
      cy: this.dimensions.shape.cy,
      r: this.dimensions.shape.r
    };
  }

  updateDimensions() {
    //Square frame that contains the circle
    let width = 0;
    let height = 0;
    const lengthX = Math.abs(this.endPoint.x - this.startPoint.x);
    const lengthY = Math.abs(this.endPoint.y - this.startPoint.y);
    if (lengthX < lengthY) {
      width = lengthX * (this.endPoint.x < this.startPoint.x ? -1 : 1);
      height = lengthX * (this.endPoint.y < this.startPoint.y ? -1 : 1);
    } else {
      width = lengthY * (this.endPoint.x < this.startPoint.x ? -1 : 1);
      height = lengthY * (this.endPoint.y < this.startPoint.y ? -1 : 1);
    }

    const frame = {
      x: this.startPoint.x,
      y: this.startPoint.y,
      w: Math.round(width),
      h: Math.round(height)
    };

    const circle = {
      cx: Math.round(frame.x + frame.w / 2),
      cy: Math.round(frame.y + frame.h / 2),
      r: Math.round(Math.abs(width / 2) - 2)
    };

    this.dimensions = {
      frame: frame,
      shape: circle
    };
    return this;
  }

  updateCoordinates() {
    this.dimensions.frame = Object.assign(this.dimensions.frame, {
      x: this.startPoint.x,
      y: this.startPoint.y
    });
    this.dimensions.shape = Object.assign(this.dimensions.shape, {
      cx: Math.round(this.dimensions.frame.x + this.dimensions.frame.w / 2),
      cy: Math.round(this.dimensions.frame.y + this.dimensions.frame.h / 2),
      r: Math.round(Math.abs(this.dimensions.frame.w / 2) - 2)
    });
    return this;
  }
}

export default Circle;
