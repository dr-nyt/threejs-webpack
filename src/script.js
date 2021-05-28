import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

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

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/normal_map.png");

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;

material.color = new THREE.Color(0x303030)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0x0000ff, 5)
pointLight.position.set(2, 5, -3);
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 1.06)
pointLight2.position.set(-6, -3, 5);
scene.add(pointLight2)
pointLight2.intensity

const pointLightHelper = new THREE.PointLightHelper(pointLight2, .5)
scene.add(pointLightHelper)

// GUI
const blueLight = gui.addFolder("Blue light")
blueLight.add(pointLight.position, "x", -10, 10, 1)
blueLight.add(pointLight.position, "y", -10, 10, 1)
blueLight.add(pointLight.position, "z", -10, 10, 1)
blueLight.add(pointLight, "intensity", 0, 10, 0.01)

const redLight = gui.addFolder("Red light")
redLight.add(pointLight2.position, "x", -10, 10, 1)
redLight.add(pointLight2.position, "y", -10, 10, 1)
redLight.add(pointLight2.position, "z", -10, 10, 1)
redLight.add(pointLight2, "intensity", 0, 10, 0.01)

//Animate
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()