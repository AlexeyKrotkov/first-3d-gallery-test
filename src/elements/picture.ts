import * as THREE from 'three';
import { textureLoader } from '../utils/texture-loader';

interface PictureProps {
    url: string;
    width?: number;
    height?: number;
}

export const getTrueProportions = ({ width, height }: any) => {
    if (width > height) return height / width;
    return width / height;
};


export class Picture {
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    constructor({ url, width, height }: PictureProps) {
        const texture = textureLoader.load(url);
        this.geometry = new THREE.BoxGeometry(
            width || 2,
            height || 2 * getTrueProportions({ height, width }),
            1,
        );
        this.material = new THREE.MeshPhongMaterial({
            map: texture,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
    }
}
