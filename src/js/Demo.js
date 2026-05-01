import { Color, EventDispatcher, Fog, GridHelper, HemisphereLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PuttyControls } from './PuttyControls.js';
import { Compositor } from './Compositor.js';
import { Interval } from './Interval.js';
import { Assets } from './Assets.js';

class Demo {
  constructor() {
    // Initialize core components
    this.assets = new Assets();
    this.interval = new Interval();
    this.interval.add(loop => this.render(loop));
    this.interval.start();

    // Initialize Three.js components
    this.canvas = document.createElement('canvas');
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ alpha: true, canvas: this.canvas });
    this.compositor = new Compositor(this.scene, this.camera, this.renderer);

    // Add orbit controls (for moving the camera)
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.mouseButtons = { LEFT: 2, MIDDLE: 2, RIGHT: 0 }; // 0 = Left/Rotate, 1 = Middle/Dolly, 2 = Right/Pan

    // Add putty controls (for transforming objects)
    this.puttyControls = new PuttyControls(this.camera, this.renderer.domElement);
    this.puttyControls.snap = 0.5;
    this.puttyControls.addEventListener('dragstart', () => this.orbitControls.enabled = false);
    this.puttyControls.addEventListener('dragend', () => this.orbitControls.enabled = true);
  }

  init() {
    // Update camera
    this.camera.position.set(0, 2, 4);
    this.camera.lookAt(0, 0, 0);

    // Add hemisphere light
    this.scene.add(new HemisphereLight('#ffffff', '#cccccc', Math.PI));

    // Add grid helper
    this.scene.add(new GridHelper(8, 16, '#cccccc', '#eeeeee'));

    // Add Putty controls object to scene
    this.scene.add(this.puttyControls.getHelper());

    // Load model
    this.assets.load('glb/player.glb', model => {
      this.scene.add(model);
      this.puttyControls.attach(model);
    });
  }

  render(loop) {
    // Render scene
    this.compositor.render();
  }
}

export { Demo };