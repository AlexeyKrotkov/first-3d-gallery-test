import * as THREE from 'three';
import { textureLoader } from '../utils/texture-loader';

export class Picture {
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;
    constructor() {
        const texture = textureLoader.load(
            'https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg',
        );
        this.geometry = new THREE.BoxGeometry(1, 1 * 0.75, 0.5);
        this.material = new THREE.MeshBasicMaterial({
            map: texture,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
