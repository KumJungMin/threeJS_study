// 주제: 애니메이션 처리
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
  // mesh 회전시키기
  // requestAnimationFrame 애니메이션 설정
  function draw() {
    // degree가 아닌 radian 값을 사용하는 방법
    // mesh.rotation.y += 0.1;
    // degree -> redian으로 변환 -> degToRad(1)이라고 하면 1 degree를 말하는 것
    mesh.rotation.y += THREE.MathUtils.degToRad(2);
    mesh.position.y += 0.01;
    if (mesh.position.y > 3) mesh.position.y -= 0.01;
    renderer.render(scene, camera);

    // 애니메이션 실행 -> 재귀함수형태로 진행
    // requestAnimationFrame == setAnimationLoop
    // requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // AR, VR할 때는 이걸 써야함
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
