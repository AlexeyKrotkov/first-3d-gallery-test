import * as React from 'react';
import * as THREE from 'three';
import { Wall } from '../elements/wall';
import { Picture } from '../elements/picture';

export class App extends React.Component {
    state = {
        mouseX: 0,
        mouseY: 0,
    };
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
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
        this.scene.add(new Picture().mesh);
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
        const {
            position: { x, y, z },
        } = this.camera;
        const { mouseX, mouseY } = this.state;
        const { offsetHeight: h, offsetWidth: w } = this.mount;
        const cH = h / 2;
        const cW = w / 2;
        const factorSpeedX = 1;
        const factorSpeedY = 1;
        this.camera.position.set(
            x - ((cW - mouseX) / 10000) * factorSpeedX,
            y + ((cH - mouseY) / 10000) * factorSpeedY,
            z,
        );
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
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
