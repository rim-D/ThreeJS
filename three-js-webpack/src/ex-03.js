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

  // 메쉬
  const geometry01 = new THREE.BoxGeometry( 0.5,0.5,0.5 );
  const material01 = new THREE.MeshStandardMaterial({
    color: 0x00ff00
  });

  const obj01 = new THREE.Mesh(geometry01, material01);
  scene.add(obj01);

  // 메쉬
  const geometry02 = new THREE.ConeGeometry( 0.4,0.6,6 );
  const material02 = new THREE.MeshStandardMaterial({
    color: 0x00ff00
  });
  
  const obj02 = new THREE.Mesh(geometry02, material02);
  scene.add(obj02);

  // 메쉬
  const geometry03 = new THREE.IcosahedronGeometry( 0.4,0 );
  const material03 = new THREE.MeshStandardMaterial({
    color: 0x00ff00
  });

  const obj03 = new THREE.Mesh(geometry03, material03);
  scene.add(obj03);

  // 렌더링 요소를 애니메이션 주고 싶을 때!
  function render(time) {

    time *= 0.001;

    obj01.position.x = -1;
    obj03.position.x = 1;

    obj01.rotation.x = time;
    //obj01.rotation.y = time;
    // obj02.rotation.x = time;
    obj02.rotation.y = time;
    obj03.rotation.z = time;
    //obj03.rotation.y = time;

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
