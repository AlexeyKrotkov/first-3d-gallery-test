import * as React from 'react';
import * as THREE from 'three';
import { Wall } from '../elements/wall';
import { Picture } from '../elements/picture';
import { SimpleLight } from '../elements/simple-light';
import { getAllPictures } from '../creators/get-all-pictures';
import { mockPhotoUrls } from '../api/mocks';
import { getValueByLimit } from '../utils/get-value-by-limit';

export class App extends React.Component {
    state = {
        mouseX: 0,
        mouseY: 0,
        totalShift: 0,
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
        const widthScreen = window.innerWidth;
        const heightScreen = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            widthScreen / heightScreen,
            0.1,
            1000,
        );
        this.camera.lookAt(new THREE.Vector3(1.4, 0.3, -2));
        this.camera.position.z = 4.5;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(widthScreen, heightScreen);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.BasicShadowMap;
        this.mount.appendChild(this.renderer.domElement);
        // elements
        this.well = new Wall().mesh;
        this.start();
        this.scene.add(this.well);
        getAllPictures().then((photoSizedInfo: any) => {
            let shift = 0;
            photoSizedInfo.forEach((photoSizeInfo: any) => {
                console.log(photoSizeInfo);
                const { source, width, height } = photoSizeInfo;
                const imageWidth = width * (width > height ? width / height : 1) / 300;
                const imageHeight =
                    height * (width <= height ? width / height : 1) / 300;
                const picture = new Picture({
                    url: source,
                    width: imageWidth,
                    height: imageHeight,
                });
                picture.mesh.position.set(shift, 0, 0);
                shift += 3.8;
                this.setState({
                    totalShift: shift,
                });
                this.scene.add(picture.mesh);
            });
        });
        // mockPhotoUrls.forEach((url: string, index: number) => {
        //     const picture = new Picture({ url });
        //     picture.mesh.position.set(index * 1.5, 0, 0);
        //     this.scene.add(picture.mesh);
        // });
        this.mainLight = new SimpleLight({ x: 0, y: 0 });
        this.mainLight.light.position.set(0, 0, 2);
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
        const { mouseX, mouseY, totalShift } = this.state;
        if (mouseX !== null && mouseY !== null) {
            const { offsetHeight: h, offsetWidth: w } = this.mount;
            const cH = h / 2;
            const cW = w / 2;
            const factorSpeedX = 1;
            const factorSpeedY = 1;
            const nextCameraX = x - ((cW - mouseX) / 10000) * factorSpeedX;
            const nextCameraY = y + ((cH - mouseY) / 10000) * factorSpeedY;
            this.camera.position.set(
                getValueByLimit({
                    value: nextCameraX,
                    min: -5,
                    max: totalShift,
                }),
                getValueByLimit({ value: nextCameraY, min: -3, max: 3 }),
                z,
            );
            this.mainLight.light.position.set(
                nextCameraX - 1,
                nextCameraY - 1,
                lightZ,
            );
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
