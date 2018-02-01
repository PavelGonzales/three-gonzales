import * as THREE from 'three'
import PromoApplication from 'views/PromoApplication'
import TWEEN from '@tweenjs/tween.js'
import Perlin from './../libs/perlin'
import XG from  './../libs/xg.min.rgba'

import './../libs/CopyShader'
import './../libs/DotScreenShader'
import './../libs/RGBShiftShader'

import './../libs/EffectComposer'
import './../libs/RenderPass'
import './../libs/ShaderPass'

class Promo extends PromoApplication {

  constructor() {
    super();

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

    this.light = new THREE.PointLight( 0xffffff, 1.5, 2000);

    this.light.color.setHSL(0.995, 0.5, 0.9);
    this.light.position.copy(this._camera.position);
    this.light.position.z = 50;
    this._scene.add(this.light);

    // this._controls.enablePan = false;
		// this._controls.enableZoom = false; 
		// this._controls.enableRotate = false; 

    this.loadFont();
    this.animate();

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
    this.titleMesh.position.y = window.innerWidth * 0.52083333333 / 100;
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

  animate() {
    
    super.animate();
    this._camera.position.set( x, y, z );

    this._renderer.render(this._scene, this._camera);
  }
}

export default Promo;
