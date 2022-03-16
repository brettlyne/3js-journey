import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MeshLambertMaterial, MeshPhongMaterial } from 'three'
import { Pane } from 'tweakpane';


const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('textures/matcaps/1.png')
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const material = new THREE.MeshBasicMaterial()
// // material.map = doorHeightTexture
// material.color.r = 0

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new MeshLambertMaterial()

// const material = new MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff00ff)

// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial()
const pane = new Pane()
material.displacementScale = .05
pane.addInput(material, 'metalness', { min: 0, max: 1, });
pane.addInput(material, 'roughness', { min: 0, max: 1, });
pane.addInput(material, 'aoMapIntensity', { min: 0, max: 10, });
pane.addInput(material, 'displacementScale', { min: 0, max: 1, });

material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.displacementMap = doorHeightTexture
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.alphaMap = doorAlphaTexture
material.transparent = true

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(.5, 64, 64),
    material
)
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(.3, .2, 64, 128),
    material
)
torus.position.x = 1.5

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, .5)
const pointLight = new THREE.PointLight(0xffffff, .5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(ambientLight, pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = .1 * elapsedTime;
    plane.rotation.y = .1 * elapsedTime;
    torus.rotation.y = .1 * elapsedTime;
    sphere.rotation.x = .15 * elapsedTime;
    plane.rotation.x = .15 * elapsedTime;
    torus.rotation.x = .15 * elapsedTime;


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()