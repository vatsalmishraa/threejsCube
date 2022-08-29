import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

/**
 * Base
 */
// Canvas
const input  = document.querySelector('canvas.webgl')
const canvas = input!

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas as HTMLElement)
controls.enableDamping = true
controls.enableZoom = false
controls.domElement

//texture
const loader = new THREE.CubeTextureLoader();
loader.setPath( '../../assets/' );
const textureCube = loader.load( [
	'Alea_1.png', 'Alea_4.png',
	'Alea_2.png', 'Alea_5.png',
	'Alea_3.png', 'Alea_6.png'
] );
textureCube.matrixAutoUpdate = true

 const dice1 = new THREE.TextureLoader().load('../../assets/Alea_1.png')
 const dice2 = new THREE.TextureLoader().load('../../assets/Alea_2.png') 
const dice3 = new THREE.TextureLoader().load('../../assets/Alea_3.png')
const dice4 = new THREE.TextureLoader().load('../../assets/Alea_4.png')
const dice5 = new THREE.TextureLoader().load('../../assets/Alea_5.png') 
const dice6 = new THREE.TextureLoader().load('../../assets/Alea_6.png')
// *6
//  *6Cube
//  *6
const cubeMaterial =[
   // new THREE.MeshBasicMaterial({ color: 0xff0000 })
      new THREE.MeshBasicMaterial({map:dice1, side:THREE.DoubleSide,color:'#ff03c2'}),
      new THREE.MeshBasicMaterial({map:dice2, side:THREE.DoubleSide,color:'#ff03c2'}),
      new THREE.MeshBasicMaterial({map:dice3, side:THREE.DoubleSide,color:'#ff03c2'}),
      new THREE.MeshBasicMaterial({map:dice4, side:THREE.DoubleSide,color:'#ff03c2'}),
      new THREE.MeshBasicMaterial({map:dice5, side:THREE.DoubleSide,color:'#ff03c2'}),
      new THREE.MeshBasicMaterial({map:dice6, side:THREE.DoubleSide,color:'#ff03c2'}),
]
const geometry = new RoundedBoxGeometry(0.5, 0.5, 0.5);

let cube  = new THREE.Mesh(geometry,cubeMaterial)
scene.add(cube)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//rotation
var SPEED = 0.01;

function rotateCube() {
    cube.rotation.x -= SPEED * 2;
    cube.rotation.y -= SPEED;
    cube.rotation.z -= SPEED * 3;
}
/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    // 
    rotateCube()
}

tick()
  }

}
