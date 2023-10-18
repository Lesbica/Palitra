

// Пример Three.js кода
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    // Добавьте вашу логику анимации и рендеринга здесь
    renderer.render(scene, camera);
};

animate();
