import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Создание объектов
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere1 = new THREE.Mesh(geometry2, material2);

let currentObject = null;

// Настройка камеры
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
document.getElementById("add-room1").addEventListener("click", () => {
    if (currentObject) {
        scene.remove(currentObject);
    }
    currentObject = cube1.clone();
    scene.add(currentObject);
    controls.target.set(currentObject.position.x, currentObject.position.y, currentObject.position.z);
    controls.update();
});

document.getElementById("add-room2").addEventListener("click", () => {
    if (currentObject) {
        scene.remove(currentObject);
    }
    currentObject = sphere1.clone();
    scene.add(currentObject);
    controls.target.set(currentObject.position.x, currentObject.position.y, currentObject.position.z);
    controls.update();
});

// Настройка фонового цвета
document.getElementById("background-color").addEventListener("input", (event) => {
    renderer.setClearColor(event.target.value);
});
