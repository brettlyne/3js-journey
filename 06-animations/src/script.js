import './style.css'
import * as THREE from 'three'
import gsap from "gsap";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 2, delay: 2, x: -2 })
gsap.to(mesh.position, { duration: 1, delay: 4, x: 0 })


const group = new THREE.Group();
scene.add(group);
for (let i = 0; i < 24; i++) {
    const geometry = new THREE.BoxGeometry(.2, 1, .4)
    const material = new THREE.MeshBasicMaterial({ color: '#2222aa' })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (i - 12) / 4;
    mesh.scale.y = -.1 * ((i - 12) / 2) ** 2 + 3
    mesh.rotation.x = i / 6
    console.log(i, mesh.scale.y);
    group.add(mesh)
}

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.y = Math.sin(elapsedTime)
    group.rotation.x = elapsedTime / 2

    renderer.render(scene, camera)
    camera.lookAt(mesh.position)

    window.requestAnimationFrame(tick)
}
tick()