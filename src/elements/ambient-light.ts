import * as THREE from 'three';

export class AmbientLight {
    light: THREE.AmbientLight;
    constructor() {
        this.light = new THREE.AmbientLight(0xffffff, 0.1);
    }
}
