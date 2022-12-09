import * as THREE from 'three'
import { objCamera, Geometry } from 'three';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // three.js 코드 넣는 곳 
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);

  // 카메라
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // //const canvas = document.querySelector('#ex-03');
  // camera.position.z = 3;
  /**
   * 광각 렌즈 : 35mm이하 / FOV 63도이상 - 화각이 넓고 피사체가 작게(넓은 범위 촬영을 원하면) - 화각이 많이 들어갈수록 투시가 강하게 들어감
   * 표준 렌즈 : 50mm / FOV 47도 - 인간의 눈과 비슷한 촬영을 원하면
   * 망원 렌즈 : 85mm이상 / FOV 28도이하 - 화각이 좁고 피사체가 크게(확대 촬영을 원하면)
   */
  const fov = 50; // 시야각, 화각
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 (가로세로비율)
  const near = 0.1; // 카메라가 시작되는 위치 -> 
  const far = 1000; // 카메라가의 시점이 끝나는 시점
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //camera.position.set(0,0,1); // x, y, z
  camera.position.x = 0; 
  camera.position.y = 0;
  camera.position.z = 2; // 나를 기준으로 카메라를 멀리하려면 +, 가까이 하려면 -

  
  // 렌더러
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true, 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 렌더될 요소
  document.body.appendChild(renderer.domElement);

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0,2, 12);
  scene.add(pointLight);

  // 도형 추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF7F00
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  scene.add(cube);

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee
  });
  const plan = new THREE.Mesh(planeGeometry, planMaterial);
  plan.rotation.x = -0.5 * Math.PI;
  plan.position.y = -0.5;
  scene.add(plan);

  // 렌더링 요소를 애니메이션 주고 싶을 때!
  function render(time) {

    time *= 0.001;
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
