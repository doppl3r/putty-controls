import { EventDispatcher } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

// Initialize module-scoped variables
const _eventBeforeRender = { type: 'beforeRender' };
const _eventRendered = { type: 'rendered' };
const _eventResize = { type: 'resize' };

/*
  The Compositor class manages post-processing effects and rendering,
  utilizing Three.js EffectComposer to apply various visual passes.
*/

class Compositor extends EventDispatcher {
  constructor(scene, camera, renderer) {
    super();

    // Assign post processing on top of renderer
    this.renderPass = new RenderPass(scene, camera);
    this.outputPass = new OutputPass(); // {} = use default resolution
    
    // Add effects to composer
    this.effectComposer = new EffectComposer(renderer);
    this.effectComposer.renderer.shadowMap.enabled = true;
    this.effectComposer.addPass(this.renderPass); // Renderer
    this.effectComposer.addPass(this.outputPass); // Gamma/sRGB correction

    // Add stats
    this.stats = new Stats();
    this.stats.dom.style = 'position: fixed; bottom: 0px; left: 0px; cursor: pointer; opacity: 0.9; z-index: 10000;';

    // Add event listeners and dispatch resize immediately
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  render() {
    // Begin stats recording
    this.stats.begin();

    // Render scene with all post processing effects
    this.dispatchEvent(_eventBeforeRender);
    this.effectComposer.render();
    this.dispatchEvent(_eventRendered);

    // End stats recording
    this.stats.end();
  }

  resize = e => {
    var width = e?.target.innerWidth || window.innerWidth;
    var height = e?.target.innerHeight || window.innerHeight;
    this.setSize(width, height)

    // Dispatch resize event
    _eventResize.width = width;
    _eventResize.height = height;
    this.dispatchEvent(_eventResize);
  }

  setSize(width, height) {
    var ratio = width / height;
    
    // Update orthographic frustum
    if (this.renderPass.camera.isOrthographicCamera) {
      this.renderPass.camera.left = -ratio * 0.5;
      this.renderPass.camera.right = ratio * 0.5;
      this.renderPass.camera.top = 0.5;
      this.renderPass.camera.bottom = -0.5;
    }

    // Update camera ratio
    this.renderPass.camera.aspect = ratio * this.renderPass.camera.zoom;
    this.renderPass.camera.updateProjectionMatrix();

    // Update renderer size
    this.effectComposer.renderer.setSize(width, height);
    this.effectComposer.setSize(width, height);
  }

  addStats() {
    document.body.appendChild(this.stats.dom);
  }

  removeStats() {
    document.body.removeChild(this.stats.dom);
  }

  showStats() {
    this.stats.dom.style.display = 'block';
  }

  hideStats() {
    this.stats.dom.style.display = 'none';
  }
}

export { Compositor };