const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const redCube = new THREE.Mesh(geometry, material)
redCube.position.y = -1.2
scene.add(redCube)

const yellowCube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 'yellow' })
)
scene.add(yellowCube)

const greenCube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 'green' })
)
greenCube.position.y = 1.2
scene.add(greenCube)

for (let i = 0; i < 100; i++) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(.5, .5, .5),
        new THREE.MeshBasicMaterial({ color: '#34ecf9' })
    )
    cube.position.z = -5
    cube.position.x = Math.random() * 10 - 5
    cube.position.y = Math.random() * 8 - 4
    scene.add(cube)
}

for (let i = 0; i < 100; i++) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(.3, .3, .3),
        new THREE.MeshBasicMaterial({ color: '#29aee8' })
    )
    cube.position.z = -2
    cube.position.x = Math.random() * 10 - 5
    cube.position.y = Math.random() * 8 - 4
    scene.add(cube)
}

for (let i = 0; i < 100; i++) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(.25, .25, .25),
        new THREE.MeshBasicMaterial({ color: '#275084' })
    )
    cube.position.z = -1
    cube.position.x = Math.random() * 10 - 5
    cube.position.y = Math.random() * 8 - 4
    scene.add(cube)
}

for (let i = 0; i < 100; i++) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(.15, .15, .15),
        new THREE.MeshBasicMaterial({ color: '#182949' })
    )
    cube.position.z = -.5
    cube.position.x = Math.random() * 10 - 5
    cube.position.y = Math.random() * 8 - 4
    scene.add(cube)
}

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height)
camera.position.z = 3

const canvas = document.getElementsByClassName('webgl')[0]
const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)