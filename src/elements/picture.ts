import * as THREE from 'three';
import { textureLoader } from '../utils/texture-loader';

interface PictureProps {
    url: string;
}

export class Picture {
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    constructor({ url }: PictureProps) {
        const texture = textureLoader.load(url);
        this.geometry = new THREE.BoxGeometry(1, 1 * 0.75, 0.5);
        this.material = new THREE.MeshPhongMaterial({
            map: texture,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
