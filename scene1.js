//FIRST THREE JS SCENE

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;
//****CUBE*****//
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
var cube     = new THREE.Mesh( geometry, material );
cube.receiveShadow = true;
scene.add( cube );
//*************//

//*****PLANE*****//
var plane_geometry = new THREE.PlaneGeometry( 32, 20, 32 );
var plane_material = new THREE.MeshPhongMaterial( {color: 0xfff000, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( plane_geometry, plane_material );
plane.receiveShadow = true;
scene.add(plane);

//*****LIGHTING*****//
var light = new THREE.SpotLight(0xffffcc); // soft white light
light.target = cube;
light.castShadow = true;

light.shadow.camera.near = 10;
light.shadow.camera.far = 5000;
light.shadow.camera.fov = 40;
//scene.add( light );

plane.position.z = -2;
light.position.set( 4, 2, 2);
camera.position.z = 5;

//scene.add( camera );
scene.add(light);

//*****CONTROLS***//
var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change' , renderer);
controls.minDistance = 20;
controls.maxDistance = 500;
controls.enablePan = false;

controls.target.copy( cube.position );
controls.update();
//light.target.position.set( 0, 0, 1);
//light.position.copy( camera.position );

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.05;
	cube.rotation.y += 0.05;
	controls.update();
	//light.rotation.x += 0.01;
	//light.rotation.y += 0.01;
	renderer.render( scene, camera );
};

animate();
