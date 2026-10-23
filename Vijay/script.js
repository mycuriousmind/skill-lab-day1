lucide.createIcons();

// Typed effect
const roles = ["Software Engineering", "Data Structures & C++", "Full Stack Systems", "RVCE CSE 3rd Semester", "Artificial Intelligence"];
let rIdx = 0, cIdx = 0, isDel = false;
const typedEl = document.getElementById('typed-text');

function typeWriter() {
    const cur = roles[rIdx];
    typedEl.textContent = isDel ? cur.substring(0, cIdx - 1) : cur.substring(0, cIdx + 1);
    isDel ? cIdx-- : cIdx++;

    let spd = isDel ? 40 : 80;
    if (!isDel && cIdx === cur.length) {
        spd = 1500;
        isDel = true;
    } else if (isDel && cIdx === 0) {
        isDel = false;
        rIdx = (rIdx + 1) % roles.length;
        spd = 400;
    }

    setTimeout(typeWriter, spd);
}

typeWriter();

// Mobile Menu (for mobile devices)
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Modal
function openModal(title, desc, tags) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = desc;

    const tContainer = document.getElementById('modal-tags');
    tContainer.innerHTML = '';

    tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium';
        span.textContent = tag;
        tContainer.appendChild(span);
    });

    document.getElementById('modal').classList.remove('opacity-0', 'pointer-events-none');
}

function closeModal() {
    document.getElementById('modal').classList.add('opacity-0', 'pointer-events-none');
}

// Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.remove('translate-y-24', 'opacity-0');
    e.target.reset();
    setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 3500);
}

function downloadResume() {
    const toast = document.getElementById('toast');
    toast.textContent = 'Resume downloaded successfully!';
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 3500);
}

// Three.js Background
window.addEventListener('load', () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090d16, 0.035);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pLight = new THREE.PointLight(0x06b6d4, 2, 30);
    pLight.position.set(4, 4, 4);
    scene.add(pLight);

    // Wireframe icosahedron
    const geo = new THREE.IcosahedronGeometry(2, 0);
    const mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.25 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Particle Field
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 30;
        pPos[i + 1] = (Math.random() - 0.5) * 30;
        pPos[i + 2] = (Math.random() - 0.5) * 30;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.06, color: 0x06b6d4, transparent: true, opacity: 0.5 });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const et = clock.getElapsedTime();
        mesh.rotation.x = et * 0.2;
        mesh.rotation.y = et * 0.3;
        pSystem.rotation.y = et * 0.01;

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
});
// End of program