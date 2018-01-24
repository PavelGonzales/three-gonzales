// forked from https://github.com/superguigui/Wagner/blob/master/example/index.js

import * as THREE from 'three'
import dat from 'dat-gui'
import WAGNER from '@superguigui/wagner/'
import PromoApplication from 'views/PromoApplication'
import BoxBlurPass from '@superguigui/wagner/src/passes/box-blur/BoxBlurPass'
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass'
import ZoomBlurPassfrom from '@superguigui/wagner/src/passes/zoom-blur/ZoomBlurPass'
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass'

class Promo extends PromoApplication {

  constructor() {
    super();
    this.cubes = [];

    this.params = {
      usePostProcessing: true,
      useFXAA: false,
      useBlur: false,
      useBloom: false
    };

    const light = new THREE.PointLight(0xFFFFFF, 1);
    light.position.copy(this._camera.position);
    this._scene.add(light);

    // this.material = new THREE.MeshPhongMaterial({color: 0x3a9ceb});
    // let c;
    // for (let i = 0; i < 100; i++) {
    //   c = this.addCube();
    //   this.cubes.push(c);
    //   this._scene.add(c);
    // }

    this.drawImage();
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

    this.initPostprocessing();
    this.initGui();

    this.animate();
  }

  drawImage() {
    let canvas2d = document.createElement('canvas');
    let ctx = canvas2d.getContext('2d');
    let size = 500;
    canvas2d.width = window.innerWidth;
    canvas2d.height = window.innerHeight;
  
    var img = new Image();   
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => {
      
      ctx.drawImage(img, 0, 0, size, size);
      document.body.appendChild(canvas2d);
  
      let data = ctx.getImageData(0, 0, size, size);
      data = data.data;
  
      let material = new THREE.LineBasicMaterial({
        color: 0xffffff
      });

      for (var y = 0; y < size; y++) {
        let geometry = new THREE.Geometry();
        let line = new THREE.Line(geometry, material);
  
        for (var x = 0; x < size; x++) {
          var bright = data[(size * y + x) * 4];
          let vector = new THREE.Vector3(x - 250, y - 250, bright/10 + 50);
          geometry.vertices.push(vector);
        }
        
        line.rotation.z = Math.PI
        
        this._scene.add(line);
      }
  
    }, false);
    img.src = './assets/textures/avatar.jpg';
  }

  // addCube() {
  //   let cube = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), this.material);

  //   cube.position.set(
  //     Math.random() * 600 - 300,
  //     Math.random() * 600 - 300,
  //     Math.random() * -500
  //   );

  //   cube.rotation.set(
  //     Math.random() * Math.PI * 2,
  //     Math.random() * Math.PI * 2,
  //     Math.random() * Math.PI * 2
  //   );
  //   return cube;
  // }

  initPostprocessing() {
    this._renderer.autoClearColor = true;
    this.composer = new WAGNER.Composer(this._renderer);
    this.fxaaPass = new FXAAPass();
    this.boxBlurPass = new BoxBlurPass(3, 3);
    this.bloomPass = new MultiPassBloomPass({
      blurAmount: 2,
      applyZoomBlur: true
    });
  }
  
  initGui() {
    const gui = new dat.GUI();
    gui.add(this.params, 'usePostProcessing');
    gui.add(this.params, 'useFXAA');
    gui.add(this.params, 'useBlur');
    gui.add(this.params, 'useBloom');
    return gui;
  }

  onMouseMove(e) {
    this._camera.rotation.y = -(event.clientX - window.innerWidth * 0.5) * 0.0007;
    this._camera.rotation.x = -(event.clientY - window.innerHeight * 0.5) * 0.0007;
    // this.light.rotation.y = (event.clientX - window.innerWidth * 0.5) * 0.0007;
    // this.light.rotation.x = (event.clientY - window.innerHeight * 0.5) * 0.0007;
  }

  animate() {
    super.animate();
    for (let i = 0; i < this.cubes.length; i++) {
      this.cubes[i].rotation.y += 0.01 + ((i - this.cubes.length) * 0.00001);
      this.cubes[i].rotation.x += 0.01 + ((i - this.cubes.length) * 0.00001);
    }
    if (this.params.usePostProcessing) {
      this.composer.reset();
      this.composer.render(this._scene, this._camera);
      if (this.params.useFXAA) this.composer.pass(this.fxaaPass);
      if (this.params.useBlur) this.composer.pass(this.boxBlurPass);
      if (this.params.useBloom) this.composer.pass(this.bloomPass);
      this.composer.toScreen();
    }
    else {
      this._renderer.render(this._scene, this._camera);
    }
  }
}

export default Promo;
