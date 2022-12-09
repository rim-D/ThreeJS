import * as THREE from 'three'
import { objCamera, Geometry, TextGeometry, TangentSpaceNormalMap, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // three.js 코드 넣는 곳 
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // 카메라
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // //const canvas = document.querySelector('#ex-03');
  // camera.position.z = 3;
  /**
   * 광각 렌즈 : 35mm이하 / FOV 63도이상 - 화각이 넓고 피사체가 작게(넓은 범위 촬영을 원하면) - 화각이 많이 들어갈수록 투시가 강하게 들어감
   * 표준 렌즈 : 50mm / FOV 47도 - 인간의 눈과 비슷한 촬영을 원하면
   * 망원 렌즈 : 85mm이상 / FOV 28도이하 - 화각이 좁고 피사체가 크게(확대 촬영을 원하면)
   */
  const fov =50; // 시야각, 화각
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 (가로세로비율)
  const near = 0.1; // 카메라가 시작되는 위치 -> 
  const far = 1000; // 카메라가의 시점이 끝나는 시점
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //camera.position.set(0,0,1); // x, y, z
  camera.position.x = 0; 
  camera.position.y = 0.4;
  camera.position.z = 4; // 나를 기준으로 카메라를 멀리하려면 +, 가까이 하려면 -

  
  // 렌더러
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true, 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 렌더될 요소
  document.body.appendChild(renderer.domElement);

  // 카메라 이후에 넣어야함
  // OrbitControls 추가 - 마우스 움직임
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1; // 최대 줌
  controls.maxDistance = 6; // 최대 줌아웃
  controls.maxPolarAngle = Math.PI / 2; // 바닥면까지 돌리고 싶지 않을 때 설정
  controls.update();

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 0, 5);
  scene.add(pointLight);

  const pointLight1 = new THREE.PointLight(0xffffff, 1);
  pointLight1.position.set(0, 5, 5);
  scene.add(pointLight1);

  const ambientLight  = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  // 도형 추가
  const loader = new THREE.FontLoader();
  loader.load( './data/Roboto Black_Regular.json', function ( font ) {

    const geometry = new THREE.TextGeometry( '< / >', {
      font: font,
      size: 0.8,
      height: 0.7,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelOffset: 0.005,
      bevelSegments: 24
    });

    // 텍스트 원점
    geometry.computeBoundingBox();

    const midX = ( geometry.boundingBox.max.x - geometry.boundingBox.min.x ) / 2.0;
    const midZ = ( geometry.boundingBox.max.z - geometry.boundingBox.min.z ) / 2.0;

    geometry.translate(-midX, 0, -midZ);

    const material = new THREE.MeshStandardMaterial({
      color: "#049ef4",
      roughness: 0.5,
      metalness: 0.4
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planMaterial = new THREE.MeshStandardMaterial({
    color: 0xED3548
  });
  const plan = new THREE.Mesh(planeGeometry, planMaterial);
  plan.rotation.x = -0.5 * Math.PI;
  plan.position.y = -0.5;
  scene.add(plan);

  // 렌더링 요소를 애니메이션 주고 싶을 때!
  function render(time) {

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
