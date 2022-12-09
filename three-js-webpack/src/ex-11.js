import * as THREE from 'three'
import { objCamera, Geometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 카메라 추가
  const fov = 50; // 시야각, 화각
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 (가로세로비율)
  const near = 1; // 카메라가 시작되는 위치 -> 
  const far = 10000; // 카메라가의 시점이 끝나는 시점
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 1000); // x, y, z
  camera.lookAt(0, 0, 0);

  // 렌더러추가
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true, 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 카메라 이후에 넣어야함
  // OrbitControls 추가 - 마우스 움직임
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 20; // 최대 줌
  controls.maxDistance = 800; // 최대 줌아웃
  controls.update();


  const skyMaterialArr =  [];
  const texture_ft = new THREE.TextureLoader().load('../static/textures/zeus_ft.jpg');
  const texture_bk = new THREE.TextureLoader().load('../static/textures/zeus_bk.jpg');
  const texture_up = new THREE.TextureLoader().load('../static/textures/zeus_up.jpg');
  const texture_dn = new THREE.TextureLoader().load('../static/textures/zeus_dn.jpg');
  const texture_rt = new THREE.TextureLoader().load('../static/textures/zeus_rt.jpg');
  const texture_lf = new THREE.TextureLoader().load('../static/textures/zeus_lf.jpg');

  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    })
  );
  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    })
  );
  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  );
  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    })
  );
  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    })
  );
  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  );

  // 반복문
  for (let i = 0; i < skyMaterialArr.length; i++) {
    skyMaterialArr[i].side = THREE.BackSide;
  }

  // 메쉬 추가
  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
  const skyMaterial = new THREE.MeshStandardMaterial({
    //color: 0x333333,
    //map: texture, // 바깥 쪽 맵핑만 설정
  });
  //skyMaterial.side = THREE.BackSide; // 안쪽으로 맵핑 설정
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArr);
  scene.add(sky);

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // 렌더링 요소를 애니메이션 주고 싶을 때!
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();


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
