import * as THREE from 'three'
import PromoApplication from 'views/PromoApplication'
import Perlin from './../libs/perlin';

class Promo extends PromoApplication {

  constructor() {
    super();

    this.mouseDown = false;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.font = undefined;
    this.titleGeo = null;
    this.subTitleGeo = null;
    this.materials = null;
    this.titleMesh = null;
    this.subTitleMesh = null;
    this.materials = [
      new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
      new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
    ];

    const light = new THREE.PointLight(0xFFFFFF, 1);
    light.position.copy(this._camera.position);
    this._scene.add(light);

    this.loadFont();
    this.animate();

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  loadFont() {
    var loader = new THREE.FontLoader();
    loader.load('assets/fonts/monospace.typeface.json', (font) => {
      this.font = font;
      this.createTitle('Pavel Gonzales');
      this.createSubTitle('Front-end developer');
    } );
  }

  createTitle(text) {
    this.titleGeo = new THREE.TextGeometry(text, {
      font: this.font,
      size: window.innerWidth * 3.64583333 / 100,
      height: 1,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 0,
      bevelEnabled: true,
      material: 0,
      extrudeMaterial: 1
    });
    this.titleGeo.computeBoundingBox();
    this.titleGeo.computeVertexNormals();

    const centerOffset = -0.5 * ( this.titleGeo.boundingBox.max.x - this.titleGeo.boundingBox.min.x );
    this.titleMesh = new THREE.Mesh( this.titleGeo, this.materials );
    this.titleMesh.position.x = centerOffset;
    this.titleMesh.position.y = window.innerWidth * 0.52083333333 / 100;;
    this.titleMesh.position.z = 0;

    this.titleMesh.rotation.x = 0;
    this.titleMesh.rotation.y = Math.PI * 2;
    this._scene.add(this.titleMesh);
  }

  createSubTitle(text) {
    this.subTitleGeo = new THREE.TextGeometry(text, {
      font: this.font,
      size: window.innerWidth * 1.5625 / 100,
      height: 1,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 0,
      bevelEnabled: true,
      material: 0,
      extrudeMaterial: 1
    });
    this.subTitleGeo.computeBoundingBox();
    this.subTitleGeo.computeVertexNormals();

    const centerOffset = -0.5 * ( this.subTitleGeo.boundingBox.max.x - this.subTitleGeo.boundingBox.min.x );
    this.subTitleMesh = new THREE.Mesh( this.subTitleGeo, this.materials );
    this.subTitleMesh.position.x = centerOffset;
    this.subTitleMesh.position.y = window.innerWidth * -2.08333333333 / 100;
    this.subTitleMesh.position.z = 0;

    this.subTitleMesh.rotation.x = 0;
    this.subTitleMesh.rotation.y = Math.PI * 2;
    this._scene.add(this.subTitleMesh);
  }

  onMouseMove(event) {
    const sensitivity = 0.05;
    event.preventDefault();
    
    const deltaX = event.clientX - this.mouseX;
    const deltaY = event.clientY - this.mouseY;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this._camera.rotation.x -= deltaY / (1000 / sensitivity);
    this._camera.rotation.y -= deltaX / (1000 / sensitivity);
  }

  onWindowResize() {
    // this.titleMesh.geometry.scale(0.8, 0.8, 0.8)
    // this.subTitleMesh.geometry.scale(0.8, 0.8, 0.8)
    // this.createTitle('Pavel Gonzales', 70 * 100 / window.innerWidth  );
    // this.createSubTitle('Front-end developer', 30 * 100 / window.innerWidth  );
  }

  animate() {
    // this._camera.lookAt(this._scene.position);
    super.animate();
    // var timer = new Date().getTime() * 0.0005;
    // this._camera.position.x = Math.floor(Math.cos( timer ) * 200);
    // this._camera.position.z = Math.floor(Math.sin( timer ) * 200);
    this._renderer.render(this._scene, this._camera);
  }
}

export default Promo;
