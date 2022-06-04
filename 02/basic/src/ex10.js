// 주제: 애니메이션 라이브러리 써보기

import * as THREE from "three";
import gasp from "gsap"; // greensock 애니메이션 라이브러리

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // scene
  const scene = new THREE.Scene();

  // fog(색상, near, far) -> 그라데이션을 줄 수도 있으며 원근감을 줄 수 있음
  scene.fog = new THREE.Fog("black", 3, 7);

  // camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시아갹
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // 색상, 빛의 강도
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  let prevTime = Date.now();
  function draw() {
    const currTime = Date.now();
    const deltaTime = currTime - prevTime;
    prevTime = currTime;

    renderer.render(scene, camera);

    // 애니메이션 실행
    renderer.setAnimationLoop(draw);
  }

  // gasp 사용
  gasp.to(
    mesh.position, // 변화를 줄 js object
    // 바꿀 속성, 값
    {
      duration: 1, // 지속시간
      y: 2, // 바꿀 속성: 값
    }
  );

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
