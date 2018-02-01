import 'three'
import 'three/examples/js/controls/OrbitControls'

class PromoApplication {
  
  constructor() {
    this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    this._camera.position.z = 4000;

    this._scene = new THREE.Scene();
    this._scene.add(this.createRoom())

    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._renderer.domElement);

    this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);

    
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  get renderer() {
    return this._renderer;
  }

  get camera() {
    return this._camera;
  }

  get scene() {
    return this._scene;
  }

  createRoom() {
    const geometry = new THREE.BoxGeometry(7000, 7000, 7000, 10, 10, 10);
    const material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
    const cube = new THREE.Mesh(geometry, material);
    return cube;
  }

  onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(timestamp) {
    requestAnimationFrame(this.animate.bind(this));

    this._renderer.render(this._scene, this._camera);
  }

}
export default PromoApplication;
