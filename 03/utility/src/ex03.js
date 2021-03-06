import * as THREE from "three";
import dat from "dat.gui";

// ----- 주제: GUI 컨트롤 사용해보기
// gui로 간편하게 객체 위치, 카메라 위치 변경해보기

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
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

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
  scene.add(mesh);

  // Dat GUI
  const gui = new dat.GUI();
  // ui로 조정하고 싶은 객체를 추가하면 됨
  // add(객체, 속성, 시작, 끝범위, 간격)
  // 방법1
  // gui.add(mesh.position, "y", -5, 5, 0.01).name("메쉬의 z 위치"");
  gui.add(camera.position, "x", -10, 10, 0.01).name("카메라의 x 위치");
  // 방법2
  gui.add(mesh.position, "y").min(-10).max(3).step(0.01).name("메쉬의 z 위치");

  camera.lookAt(mesh.position);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;
    // draw할 때도 추가해줘야 gui로 이동시켜도 카메라가 대상을 바라봄
    camera.lookAt(mesh.position);

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
