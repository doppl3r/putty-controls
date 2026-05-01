import { Color, EventDispatcher, Fog, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Compositor } from './Compositor.js';

class Demo {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ alpha: true, canvas: this.canvas });
    this.compositor = new Compositor(this.scene, this.camera, this.renderer);
  }
}

export { Demo };