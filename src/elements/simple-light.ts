import * as THREE from 'three';

export class SimpleLight {
    light: THREE.PointLight;
    constructor({x, y}: any) {
        this.light = new THREE.PointLight( 0xffffff, 1.5, 6 );
        this.light.castShadow = true;
        this.light.shadow.camera.near = 0.1;
        this.light.shadow.camera.far = 25;
        this.light.position.set( 0, 0, 3 );
    }
}
