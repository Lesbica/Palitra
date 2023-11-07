import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);
THREE.ColorManagement.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new OBJLoader();
const gltfLoader = new GLTFLoader().setDRACOLoader(new DRACOLoader());
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

function loadAndAddModel(modelPath) {
    if (loadedModel) {
        scene.remove(loadedModel);
    }
    loader.load(
        modelPath,
    // вызывается когда ресурс загружен
    function ( object ) {
        loadedModel = object;
        scene.add( object );

        // Подсчет ограничивающей рамки фигуры
        const boundingBox = new THREE.Box3().setFromObject(loadedModel);

        // Вычисление центра ограничивающей рамки
        const center = boundingBox.getCenter(new THREE.Vector3());

        // Получение размеров ограничивающей рамки
        const size = boundingBox.getSize(new THREE.Vector3());

        // Вычисление диагонали ограничивающей рамки
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let distance = Math.abs(maxDim / Math.sin(fov / 2));

        // Подгонка положения и масштаба камеры
        camera.position.copy(center);
        camera.position.z += distance;
        camera.lookAt(center);

        // Устанавливаем позицию камеры и зум
        controls.target.copy(center);
        controls.update();

    },
    // вызывается когда загружется
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // вызываеться когда есть ошибка
    function ( error ) {

        console.log( 'An error happened' );

    }
    );
}

function loadAndAddModelGLTF(modelPath) {
    if (loadedModel) {
        scene.remove(loadedModel);
    }
    gltfLoader.load(
        modelPath,
    // вызывается когда ресурс загружен
    function ( gltf ) {
        loadedModel = gltf.scene;
        scene.add( gltf.scene );

        // Подсчет ограничивающей рамки фигуры
        const boundingBox = new THREE.Box3().setFromObject(loadedModel);

        // Вычисление центра ограничивающей рамки
        const center = boundingBox.getCenter(new THREE.Vector3());

        // Получение размеров ограничивающей рамки
        const size = boundingBox.getSize(new THREE.Vector3());

        // Вычисление диагонали ограничивающей рамки
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let distance = Math.abs(maxDim / Math.sin(fov / 2));

        // Подгонка положения и масштаба камеры
        camera.position.copy(center);
        camera.position.z += distance;
        camera.lookAt(center);

        // Устанавливаем позицию камеры и зум
        controls.target.copy(center);
        controls.update();

    },
    // вызывается когда загружется
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // вызываеться когда есть ошибка
    function ( error ) {

        console.log( 'An error happened' );

    }
    );
}

// Обработчики событий для добавления объектов
document.getElementById("chair").addEventListener("click", () => {
    loadAndAddModel('static/Chair.obj');
});

document.getElementById("sofa").addEventListener("click", () => {
    loadAndAddModel('static/Sofa.obj');
});

document.getElementById("bed").addEventListener("click", () => {
    loadAndAddModel('static/Bed.obj');
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

    // Устанавливаем цвет для объекта (loadedModel)
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
        material = new THREE.MeshBasicMaterial( {map: texture} );
    } else if (selectedMaterialType === "wood") {
        texture = new THREE.TextureLoader().load('texture/wood.jpg' ); 
        material = new THREE.MeshBasicMaterial( {map: texture} );
    }

    // Применяем выбранный материал к объекту (loadedModel)
    if (loadedModel) {
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }
});

const fileInput = document.getElementById('file-input');
const importOption = document.getElementById('import-option');

// Обработчик нажатия на "Import"
importOption.addEventListener('click', () => {
    // Симулируем клик по скрытому input элементу
    fileInput.click();
});

// Обработчик выбора файла
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

        if (fileExtension === "obj") {
            console.log("Selected file is of type OBJ.");
            const filePath = URL.createObjectURL(file);
            loadAndAddModel(filePath);
          } else if (fileExtension === "gltf") {
            console.log("Selected file is of type GLTF.");
            const filePath = URL.createObjectURL(file);
            loadAndAddModelGLTF(filePath);
          }
        
    }
});

const exportOption = document.getElementById('export-option');

exportOption.addEventListener('click', () => {
    if (loadedModel) {
        // JSON-представление загруженной модели
        const gltfExporter = new GLTFExporter();
        gltfExporter.parse(loadedModel, (result) => {
            const gltfData = JSON.stringify(result);

            // Ссылка для скачивания файла
            const blob = new Blob([gltfData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'exported_model.gltf'; // Имя файла
            document.body.appendChild(a);
            a.click();

            // Очистить ссылку после скачивания
            window.URL.revokeObjectURL(url);
        });
    }
});