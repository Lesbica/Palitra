import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new OrbitControls( camera, renderer.domElement );

// Настройка камеры
camera.position.set(0, 0, 1);
controls.listenToKeyEvents( window );
controls.enableDamping = true;
controls.update();


const loader = new GLTFLoader();

// Создание объектов
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere1 = new THREE.Mesh(geometry2, material2);

// Добавление объектов на сцену
scene.add(cube1);
scene.add(sphere1);


// Основной рендеринг
const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();

// Добавление обработчиков событий на кнопки "Add"
document.getElementById("add-room1").addEventListener("click", () => {
    scene.children.length = 0;
    scene.add(cube1.clone());
    controls.target.set(cube1.position.x, cube1.position.y, cube1.position.z);
    controls.update();
});

document.getElementById("add-room2").addEventListener("click", () => {
    scene.children.length = 0;
    scene.add(sphere1.clone());
    controls.target.set(cube1.position.x, cube1.position.y, cube1.position.z);
    controls.update();
});

// Настройка фонового цвета
document.getElementById("background-color").addEventListener("input", (event) => {
    renderer.setClearColor(event.target.value);
});
