import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.js'
import Stats from 'three/examples/jsm/libs/stats.module'

/* SCENE */
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

/* RENDERER */
const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.25
// renderer.shadowMap.enabled = true


/* STATS */
const stats = Stats()
document.body.appendChild(stats.dom)

/* CAMERA */
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 )
camera.position.set(0,0,500)

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true
controls.autoRotateSpeed = 0.5
controls.enableDamping = true

/* POINTLIGHT */
const pointlight = new THREE.PointLight(0xffffff,1);
pointlight.position.set(200,200,200);
scene.add(pointlight);

/* PLANE
const phongMaterial = new THREE.MeshPhongMaterial()
const planeGeometry = new THREE.PlaneGeometry(100, 100)
const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial)
planeMesh.rotateX(-Math.PI / 2)
planeMesh.receiveShadow = true
scene.add(planeMesh)
*/

const envmaploader = new THREE.PMREMGenerator(renderer)

new RGBELoader().setPath('textures/').load('satara-night.hdr', function(hdrmap) {

  const envmap = envmaploader.fromCubemap(hdrmap)
  const flakeTexture = new THREE.CanvasTexture(new FlakesTexture())
  flakeTexture.wrapS = THREE.RepeatWrapping
  flakeTexture.wrapT = THREE.RepeatWrapping
  flakeTexture.repeat.x = 10
  flakeTexture.repeat.y = 6

  const flakeMaterial = {
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    metalness: 0.9,
    roughness: 0.5,
    color: 0x8418ca,
    normalMap: flakeTexture,
    normalScale: new THREE.Vector2(0.15, 0.15),
    envMap: envmap.texture
  }

  /* GLOBE */
  const geometry = new THREE.SphereGeometry(100,64,64);
  const material = new THREE.MeshPhysicalMaterial(flakeMaterial);
  const globe = new THREE.Mesh( geometry, material );
  scene.add( globe );

})


window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

animate();