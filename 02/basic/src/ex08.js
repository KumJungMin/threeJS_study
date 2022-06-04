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
  // js의 Date.noe()로 애니메이션 조정하는 법
  let prevTime = Date.now();
  function draw() {
    const currTime = Date.now();
    const deltaTime = currTime - prevTime; // 시간차 구하기
    prevTime = currTime;
    mesh.rotation.y += deltaTime * 0.003;
    mesh.position.y += deltaTime * 0.0004;
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
