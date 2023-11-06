import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);
THREE.ColorManagement.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new OBJLoader();
let loadedModel = null;

camera.position.set(0, 0, 5);
controls.update();

// Создаем источник света
const light = new THREE.PointLight(0xffffff, 1); // Цвет и интенсивность света
light.position.set(0, 5, 5); // Положение света

scene.add(light);

// Основной рендеринг
const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();

// Функция для обработки движения света
function moveLight(direction) {
    const speed = 0.5;
    if (direction === 'left') {
        light.position.x -= speed;
    } else if (direction === 'right') {
        light.position.x += speed;
    } else if (direction === 'up') {
        light.position.y += speed;
    } else if (direction === 'down') {
        light.position.y -= speed;
    }
}

// Функция для вращения света
function rotateLight(direction) {
    const rotationSpeed = 1;
    if (direction === 'plus') {
        light.rotation.x += rotationSpeed;
        light.rotation.y += rotationSpeed;
    } else if (direction === 'minus') {
        light.rotation.x -= rotationSpeed;
        light.rotation.y -= rotationSpeed;
    }
}

// Обработчик события клавиатуры для перемещения света
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLight('left');
    } else if (event.key === 'ArrowRight') {
        moveLight('right');
    } else if (event.key === 'ArrowUp') {
        moveLight('up');
    } else if (event.key === 'ArrowDown') {
        moveLight('down');
    }else if (event.key === '+') {
        rotateLight('plus');
    } else if (event.key === '-') {
        rotateLight('minus');
    }
});



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
        camera.position.set(0, 0, 5);
        controls.update();
    }
});

// Настройка фонового цвета
renderer.setClearColor(0x808080);

const figureColorInput = document.getElementById("figure-color");

figureColorInput.addEventListener("input", (event) => {
    const colorHex = event.target.value; // Получаем выбранный цвет в формате HEX

    // Преобразуем HEX в RGB и создаем объект цвета
    const color = new THREE.Color(colorHex);

    // Устанавливаем цвет для вашего объекта (например, loadedModel)
    if (loadedModel) {
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                child.material.color = color;
            }
        });
    }
});



const materialTypeSelect = document.getElementById("material-type");

let material;
let texture;
materialTypeSelect.addEventListener("change", (event) => {
    const selectedMaterialType = event.target.value;

    if (selectedMaterialType === "iron") {
        texture = new THREE.TextureLoader().load('texture/iron.jpg' );
        material = new THREE.MeshPhongMaterial( {map: texture} );
    } else if (selectedMaterialType === "wood") {
        texture = new THREE.TextureLoader().load('texture/wood.jpg' ); 
        material = new THREE.MeshToonMaterial( {map: texture} );
    }

    // Применяем выбранный материал к вашему объекту (например, loadedModel)
    if (loadedModel) {
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }
});
