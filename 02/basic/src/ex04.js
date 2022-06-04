// 주제: 배경색, 투명도 설정
import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
    alpha: true, // 배경색 투명하게
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x00ff00); // 배경색 지정
  renderer.setClearAlpha(0.5); // 투명도 조절 - 0 ~ 1사이의 값

  // scene
  // render에 scene이 올라가는 형태이므로 scene에 지정한 색상이 render에서 설정한 색상보다 우선순위가 높음
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue"); //scene에 색상지정시 THREE.Color를 사용해야함

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

  // light(조명)
  // DirectionalLight 태양빛과 유사
  // 조명은 여러개를 scene에 추가할 수 있으나 성능에는 좋지 않음
  const light = new THREE.DirectionalLight(0xffffff, 1); // 색상, 빛의 강도
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial는 빛에 영향을 받지 않는 메쉬임
  const meterial = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 투영에 관련한 값에 변화를 줄 시 꼭 실행시켜줘야함
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);
}
