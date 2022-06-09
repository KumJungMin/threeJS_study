import * as THREE from "three";

// ----- 주제: 초당 프레임(FPS) 체크하기

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 0;
  scene.add(camera);

  // AxesHelper: 축을 보여줌
  const axesHelper = new THREE.AxesHelper(3); // 사이즈
  scene.add(axesHelper);

  // GridHelper: 그리드를 보여줌
  const gridHelper = new THREE.GridHelper(5); // 사이즈
  scene.add(gridHelper);

  // Light
  // AmbientLight: 전체적으로 조명을 은은하게 적용
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 2;
  scene.add(mesh);

  camera.lookAt(mesh.position); // 카메라가 대상의 위치를 바라보도록 함

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
