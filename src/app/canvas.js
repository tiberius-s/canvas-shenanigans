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
 *    [x] draw
 *        [x] rectangle
 *        [x] circle
 *        [x] polygon
 *    [] resize
 *        [] bounding rectangle for each shape (maybe not rectangle)
 *        [] a selector on the corner of bounding box to adjust size - bottom right?
 *        [] massage all the dimensions on resizze, ugh
 *    [] upload image
 *    [] parse html <img> and <map> (if available)
 *    [] generate proper <map> or modify existing
 */

class CanvasApp {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.shapes = document.getElementsByName("shape");
    this.currentDrawShape;
    this.currentAction;
    this.shapeInProgress;
    this.focusedShape;
    this.maps = [];
    this.isMouseDown = false;

    this.canvas.addEventListener("mousedown", e => this.mouseDown(e), false);
    this.canvas.addEventListener("mousemove", e => this.mouseMove(e), false);
    this.canvas.addEventListener("mouseup", e => this.mouseUp(e), false);

    this.shapes.forEach(node =>
      node.addEventListener("change", e => this.setShape(), false)
    );
    this.init();
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
    ActionDispatcher[this.currentAction].onMouseDown(this, coords, e);
    this.render();
    e.preventDefault();
  }

  mouseMove(e) {
    if (
      this.isMouseDown ||
      (this.shapeInProgress && this.shapeInProgress.inUse())
    ) {
      const coords = this.getMouseCoords(e);
      ActionDispatcher[this.currentAction].onMouseMove(this, coords, e);
      this.render();
    }
    e.preventDefault();
  }

  mouseUp(e) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      const coords = this.getMouseCoords(e);
      ActionDispatcher[this.currentAction].onMouseUp(this, coords, e);
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

  clearCanvas(del) {
    if (del) {
      this.shapeInProgress = undefined;
      this.focusedShape = undefined;
      this.maps = [];
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setShape() {
    const shapes = [...this.shapes];
    const selected = shapes.find(shape => shape.checked);
    selected !== undefined
      ? (this.currentDrawShape = SHAPES[selected.value.toUpperCase()])
      : (this.currentDrawShape = SHAPES.CIRCLE);
    if (!selected) {
      shapes.find(shape => shape.value === SHAPES.CIRCLE).checked = true;
    }
  }

  determineAction(coords) {
    const shape = this.maps.find(shape => shape.contains(coords));
    if (shape) {
      if (shape.drawing) {
        return;
      }
      if (this.focusedShape) {
        this.focusedShape.deselect();
      }
      this.focusedShape = shape;
      this.currentAction = ACTIONS.MOVE;
      // console.log("Now we move");
    } else {
      if (this.focusedShape) {
        this.focusedShape.deselect();
      }
      this.currentAction = ACTIONS.DRAW;
      // console.log("Now we draw");
    }
  }

  deleteMap() {
    if (this.focusedShape) {
      let index = this.maps.findIndex(
        shape => shape.id === this.focusedShape.id
      );
      this.maps.splice(index, 1);
      this.focusedShape = undefined;
      this.render();
    }
  }

  //TODO: Refactor or remove
  displayMaps() {
    const mapContainer = document.getElementById("maps");
    mapContainer.innerHTML = "";
    let content = "";
    this.maps.forEach(shape => {
      content += `
      <div class="map">
        <div>Shape: ${shape.type} |  Coords: ${JSON.stringify(
        shape.getAreaCoords()
      )} Area in pixels ${shape.getArea()} | Focused: ${shape.selected}</div>
      </div>
      `;
    });
    mapContainer.innerHTML = content;
  }

  init() {
    this.setShape();
  }
}

export default CanvasApp;
