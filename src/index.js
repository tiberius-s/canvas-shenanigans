import CanvasApp from './app/canvas';
import './styles.css';

const canvas = new CanvasApp();
window.canvas = canvas;
window.render = () => canvas.render();