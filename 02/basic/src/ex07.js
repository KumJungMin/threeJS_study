// 주제: 애니메이션 처리 + 성능 보정
// 애니메이션을 컴퓨터 성능별로 보정해보자!

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
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue"); //scene에 색상지정시 THREE.Color를 사용해야함

  // camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시아갹
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // 색상, 빛의 강도
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();
  function draw() {
    // clock.getElapsedTime: 절대 경과 시간
    // 컴퓨터 성능이 bad -> draw()가 실행되는 경과시간의 간격이 넓음 -> 이 간격으로 천천히 동작시킴 -> 성능 조정
    // 같은 시간동안 같은 속도로 움직임(대신 성능이 안보이면 뜩뜩 끊기듯이 움직일 수 있음)
    const time = clock.getElapsedTime();
    mesh.rotation.y = time * 2;
    mesh.position.y += 0.01;
    if (mesh.position.y > 3) mesh.position.y = 0;
    renderer.render(scene, camera);

    // 애니메이션 실행
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 투영에 관련한 값에 변화를 줄 시 꼭 실행시켜줘야함
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
