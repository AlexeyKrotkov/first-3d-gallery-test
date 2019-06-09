import * as React from 'react';
import * as THREE from 'three';
import { Wall } from '../elements/wall';
import { Picture } from '../elements/picture';
import { SimpleLight } from '../elements/simple-light';
import { getAllPictures } from '../creators/get-all-pictures';
import { mockPhotoUrls } from '../api/mocks';

export class App extends React.Component {
    state = {
        mouseX: 0,
        mouseY: 0,
    };
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mainLight: SimpleLight;
    mount: any;
    well: THREE.Mesh;
    frameId: any;

    onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    componentDidMount() {
        this.setState({
            mouseX: window.innerWidth / 2,
            mouseY: window.innerHeight / 2,
        });
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000,
        );
        this.camera.position.z = 4;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        // elements
        this.well = new Wall().mesh;
        this.start();
        this.scene.add(this.well);
        // getAllPictures().then((photoSizedInfo: any) => {
        //     console.log(photoSizedInfo.map((tes: any) => tes.source));
        //     photoSizedInfo.forEach((photoSizeInfo: any, index: number) => {
        //         const picture = new Picture({ url: photoSizeInfo.source });
        //         picture.mesh.position.set(index * 1.5, 0, 0);
        //         this.scene.add(picture.mesh);
        //     });
        // });
        mockPhotoUrls.forEach((url: string, index: number) => {
            const picture = new Picture({ url });
            picture.mesh.position.set(index * 1.5, 0, 0);
            this.scene.add(picture.mesh);
        });
        this.mainLight = new SimpleLight({ x: 0, y: 0 });
        this.scene.add(this.mainLight.light);
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        this.stop();
        // @ts-ignore
        this.mount.removeChild(this.renderer.domElement);
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    animate = () => {
        this.onCameraMove();
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    onCameraMove = () => {
        const {
            position: { x, y, z },
        } = this.camera;
        const {
            position: { z: lightZ },
        } = this.mainLight.light;
        const { mouseX, mouseY } = this.state;
        if (mouseX !== null && mouseY !== null) {
            const { offsetHeight: h, offsetWidth: w } = this.mount;
            const cH = h / 2;
            const cW = w / 2;
            const factorSpeedX = 1;
            const factorSpeedY = 1;
            const nextCameraX = x - ((cW - mouseX) / 10000) * factorSpeedX;
            const nextCameraY = y + ((cH - mouseY) / 10000) * factorSpeedY;
            this.camera.position.set(nextCameraX, nextCameraY, z);
            this.mainLight.light.position.set(nextCameraX, nextCameraY, lightZ);
        }
    };

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    };

    onMouseMove = (e: any) => {
        const { clientX, clientY } = e;
        this.setState({
            mouseX: clientX,
            mouseY: clientY,
        });
    };
    render() {
        return (
            <div
                onMouseMove={this.onMouseMove}
                ref={mount => {
                    this.mount = mount;
                }}
            />
        );
    }
}
