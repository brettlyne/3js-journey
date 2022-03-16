import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const count = 20;
const geometry = new THREE.BufferGeometry()
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - .5) * 2
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
const material = new THREE.MeshBasicMaterial({ color: 0x5FA9FF, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const geometry2 = new THREE.BufferGeometry()
const positionsArray2 = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray2[i] = (Math.random() - .5) * 2
}
const positionsAttribute2 = new THREE.BufferAttribute(positionsArray2, 3)
geometry2.setAttribute('position', positionsAttribute2)
const material2 = new THREE.MeshBasicMaterial({ color: 0xFF8513, wireframe: true })
const mesh2 = new THREE.Mesh(geometry2, material2)
scene.add(mesh2)

const geometry3 = new THREE.BufferGeometry()
const positionsArray3 = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray3[i] = (Math.random() - .5) * 2
}
const positionsAttribute3 = new THREE.BufferAttribute(positionsArray3, 3)
geometry3.setAttribute('position', positionsAttribute3)
const material3 = new THREE.MeshBasicMaterial({ color: 0xF2B000, wireframe: true })
const mesh3 = new THREE.Mesh(geometry3, material3)
scene.add(mesh3)


// Sizes
const sizes = {
    // width: window.innerWidth,
    // height: window.innerHeight
    width: 50,
    height: 50

}

window.addEventListener('resize', () => {
    // Update sizes
    // sizes.width = window.innerWidth
    // sizes.height = window.innerHeight
    sizes.width = 50
    sizes.height = 50

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setPixelRatio(.1)

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()