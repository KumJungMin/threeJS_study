// 주제: 브라우저 창 사이즈 변경에 대응하기
import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true });
  // TIP: canvas에서 고해상도를 보여주기 위해서는 canvas의 width, height를 2배 크기로 하고 2배 확대해서 보여주는 게 좋음
  // -> (window.devicePixelRatio: 해당 기기의 종횡비)
  // 기기별 종횡비에 맞게 크기 지정하는 게 좋음
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시아갹
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshBasicMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 수정
    camera.updateProjectionMatrix(); // 카메라 투영에 관련한 값에 변화를 줄 시 꼭 실행시켜줘야함
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  // 이벤트
  window.addEventListener("resize", setSize);
}
