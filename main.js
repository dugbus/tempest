import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(100,64,64);
const material = new THREE.MeshPhysicalMaterial();
const globe = new THREE.Mesh( geometry, material );
scene.add( globe );

camera.position.set(0,0,500);

const controls = new OrbitControls(camera, renderer.domElement);

const pointlight = new THREE.PointLight(0xffffff,1);
pointlight.position.set(200,200,200);
scene.add(pointlight);

function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

animate();