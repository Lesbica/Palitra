import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new OBJLoader();
let loadedModel = null;

camera.position.set(0, 0, 5);
controls.update();

// Основной рендеринг
const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();

// Обработчики событий для добавления объектов
document.getElementById("chair").addEventListener("click", () => {
    if(loadedModel){
        scene.remove(loadedModel);
    }
    loader.load(
        // resource URL
        'static/Chair.obj',
        // called when resource is loaded
        function ( object ) {
            loadedModel = object;
            scene.add( object );
    
        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );
});

document.getElementById("sofa").addEventListener("click", () => {
    if(loadedModel){
        scene.remove(loadedModel);
    }
    loader.load(
        // resource URL
        'static/Koltuk.obj',
        // called when resource is loaded
        function ( object ) {
            loadedModel = object;
            scene.add( object );
    
        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );
});

document.getElementById("bed").addEventListener("click", () => {
    if(loadedModel){
        scene.remove(loadedModel);
    }
    loader.load(
        // resource URL
        'static/Bed.obj',
        // called when resource is loaded
        function ( object ) {
            loadedModel = object;
            scene.add( object );
    
        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );
});


document.getElementById("clear").addEventListener("click", () => {
    if (loadedModel) {
        scene.remove(loadedModel);
    }
});

// Настройка фонового цвета
renderer.setClearColor(0xffffff);
