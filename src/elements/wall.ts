import * as THREE from 'three';
import * as WallImg from '../textures/wall-white.jpg';

export class Wall {
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;
    constructor() {
        const texture = new THREE.TextureLoader().load(WallImg);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 200, 20 );
        this.geometry = new THREE.PlaneGeometry(500, 50, 1, 1);
        this.material = new THREE.MeshPhongMaterial({
            map: texture,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
    }
}
