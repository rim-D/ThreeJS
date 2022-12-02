import * as THREE from 'three'
import { objCamera, Geometry } from 'three';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // three.js 코드 넣는 곳 
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //const canvas = document.querySelector('#ex-03');
  camera.position.z = 3;
  
  // 렌더러
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  //const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 렌더될 요소
  document.body.appendChild(renderer.domElement);

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0,2, 12);
  scene.add(pointLight);

  // 도형 추가
  const geometry01 = new THREE.TorusGeometry( 0.3,0.15,16,40 );
  const material01 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    metalness: 1,
    transparent: true,
    opacity: 0.3
  });
  material01.wireframe = true;
  const obj01 = new THREE.Mesh(geometry01, material01);
  obj01.position.x = -2;
  scene.add(obj01);

  const geometry02 = new THREE.TorusGeometry( 0.3,0.15,16,40 );
  const material02 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    shininess: 60,
    //specular: 0x004fff
  });
  const obj02 = new THREE.Mesh(geometry02, material02);
  obj02.position.x = -1;
  scene.add(obj02);

  const geometry03 = new THREE.TorusGeometry( 0.3,0.15,16,40 );
  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  });
  const obj03 = new THREE.Mesh(geometry03, material03);
  obj03.position.x = 0;
  scene.add(obj03);

  const geometry04 = new THREE.TorusGeometry( 0.3,0.15,16,40 );
  const material04 = new THREE.MeshStandardMaterial({
    color: 0xff7f00
  });
  const obj04 = new THREE.Mesh(geometry04, material04);
  obj04.position.x = 1;
  scene.add(obj04);

  const geometry05 = new THREE.TorusGeometry( 0.3,0.15,16,40 );
  const material05 = new THREE.MeshStandardMaterial({
    color: 0xff7f00
  });
  const obj05 = new THREE.Mesh(geometry05, material05);
  obj05.position.x = 2;
  scene.add(obj05);


  // 렌더링 요소를 애니메이션 주고 싶을 때!
  function render(time) {

    time *= 0.001;

    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    obj05.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize(){
    //종회비에 맞추어 수정
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
