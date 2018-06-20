import Circle from "./circle";
import Rectangle from "./rectangle";
import Polygon from './polygon';

const ShapeFactory = (shape, coords, context) => {
  switch (shape) {
    case "circle":
      return new Circle(coords, context);
    case "rectangle":
      return new Rectangle(coords, context);
    case "polygon":
      return new Polygon(coords, context);
    default:
      throw new Error('Invalid shape passed to constructor');
  }
};

export default ShapeFactory;
