import ActionDispatcher from "./actions/actionDispatcher";
import ACTIONS from "./actions/actions";
import Point from "./shapes/point";
import SHAPES from "./shapes/shapes";
import { ENGINE_METHOD_DIGESTS } from "constants";

/**
 * TODO:
 * -- Implement different actions on mouse events
 *    [x] select
 *    [x] move
 *    [] resize
 *    [] draw
 *        [x] rectangle
 *        [x] circle
 *        [] polygon
 */

class CanvasApp {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.currentDrawShape = SHAPES.CIRCLE;
    this.currentAction = "draw";
    this.selectedShape;
    this.maps = [];
    this.isMouseDown = false;

    this.canvas.addEventListener("mousedown", e => this.mouseDown(e), false);
    this.canvas.addEventListener("mousemove", e => this.mouseMove(e), false);
    this.canvas.addEventListener("mouseup", e => this.mouseUp(e), false);
  }

  render() {
    if (this.canvas.getContext) {
      this.clearCanvas();
      this.maps.forEach(r => {
        // if (!r.inUse() && !this.isMouseDown) {
        //   console.log(r.getAreaCoords());
        // }
        r.draw();
      });
      this.displayMaps();
    }
  }

  mouseDown(e) {
    this.isMouseDown = true;
    const coords = this.getMouseCoords(e);
    this.determineAction(coords);
    ActionDispatcher[this.currentAction].onMouseDown(this, coords);
    this.render();
    e.preventDefault();
  }

  mouseMove(e) {
    if (this.isMouseDown) {
      const coords = this.getMouseCoords(e);
      ActionDispatcher[this.currentAction].onMouseMove(this, coords);
      this.render();
    }
    e.preventDefault();
  }

  mouseUp(e) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      const coords = this.getMouseCoords(e);
      ActionDispatcher[this.currentAction].onMouseUp(this, coords);
      this.render();
    }
    e.preventDefault();
  }

  getMouseCoords(e) {
    const boundingRect = this.canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - boundingRect.left);
    const y = Math.round(e.clientY - boundingRect.top);
    return new Point(x, y);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  changeShape() {
    const element = document.getElementById("shape");
    const selection = element.options[element.selectedIndex].value;
    for (const shape in SHAPES) {
      if (SHAPES.hasOwnProperty(shape)) {
        if (selection === SHAPES[shape]) {
          this.currentDrawShape = SHAPES[shape];
        }
      }
    }
  }

  determineAction(coords) {
    const shape = this.maps.find(shape => shape.contains(coords));
    if (shape) {
      if (this.selectedShape) {
        this.selectedShape.deselect();
      }
      this.selectedShape = shape;
      this.currentAction = ACTIONS.MOVE;
      console.log("Now we move");
    } else {
      this.currentAction = ACTIONS.DRAW;
      console.log("Now we draw");
    }
  }

  removeInvalidShape(shape) {
    return shape.getArea() > 300;
  }

  deleteMap() {
    if (this.selectedShape) {
      let index = this.maps.findIndex(shape => shape.id === this.selectedShape.id);
      this.maps.splice(index, 1);
      this.selectedShape = undefined;
      this.render();
    }
  }

  displayMaps() {
    const mapContainer = document.getElementById("maps");
    mapContainer.innerHTML = "";
    let content = "";
    this.maps.forEach(shape => {
      content += `
      <div class="map">
        <div>Shape: ${shape.type} |  Coords: ${JSON.stringify(shape.getAreaCoords())} Area in pixels ${shape.getArea()} | Focused: ${shape.selected}</div>
      </div>
      `
    });
    mapContainer.innerHTML = content;
  }
}

export default CanvasApp;
