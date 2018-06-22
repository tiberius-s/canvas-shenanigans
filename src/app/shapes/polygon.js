import Shape from "./shapeClass";

class Polygon extends Shape {
  constructor(coords, context) {
    super(coords, context);
    this.type = "polygon";
    this.points = [];
  }

  draw() {
    this.path = new Path2D();
    this.path.moveTo(
      this.dimensions.shape.points[0].x,
      this.dimensions.shape.points[0].y
    );
    this.dimensions.shape.points.forEach(point => {
      this.path.lineTo(point.x, point.y);
    });
    if (this.drawing) {
      this.path.lineTo(this.endPoint.x, this.endPoint.y);
    }
    this.path.closePath();
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke(this.path);
  }

  getArea() {
    const points = this.dimensions.shape.points;
    const n = points.length;
    let area = 0;
    let prev = n - 1;
    if (n > 2) {
      for (let curr = 0; curr < n; curr++) {
        area += points[prev].x * points[curr].y;
        area -= points[curr].x * points[prev].y;
        prev = curr;
      }
    }
    return Math.round(Math.abs(area) / 2);
  }

  getAreaCoords() {
    return this.dimensions.shape.points;
  }

  updateDimensions(block) {
    if (block) {
      return;
    }
    const exists = this.points.find(pair => {
      return pair.x === this.endPoint.x && pair.y === this.endPoint.y;
    });
    if (!exists) {
      this.points.push({
        x: Math.round(this.endPoint.x),
        y: Math.round(this.endPoint.y)
      });
    }
    this.dimensions.shape = { points: this.points };
    return this;
  }

  updateCoordinates() {
    const delta = {
      x: this.startPoint.x - Math.abs(this.points[0].x),
      y: this.startPoint.y - Math.abs(this.points[0].y)
    };
    const newCoords = this.points.map(pair => {
      return {
        x: pair.x + delta.x,
        y: pair.y + delta.y
      };
    });
    this.dimensions.shape.points = newCoords;
    return this;
  }
}

export default Polygon;
