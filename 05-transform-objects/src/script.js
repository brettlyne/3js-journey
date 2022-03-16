import './style.css'
import * as THREE from 'three'
import { MeshToonMaterial } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(.7, -.6, 1)
mesh.scale.set(2, .5, .5)

mesh.rotation.y = Math.PI * .25
mesh.rotation.x = Math.PI * .25
scene.add(mesh)

console.log(mesh.position.length());
console.log(mesh.position.distanceTo(camera.position));

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


// grouped objects
const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#99d98c' })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#52b69a' })
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#168aad' })
)
cube1.position.x = 1.1
cube3.position.x = -1.1
group.add(cube1)
group.add(cube2)
group.add(cube3)
group.position.y = -1
group.scale.y = 3

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
camera.lookAt(mesh.position)
renderer.render(scene, camera)

