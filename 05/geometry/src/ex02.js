import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: Geometry 조작하기, segment 추가해서 조작
// segment를 늘리면 그 만큼 점들이 늘어나는데, 이 점들을 조작해서 애니메이션을 만들어보자!

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
  camera.position.z = 10;
  scene.add(camera);

  // 카메라 컨트롤
  // 드래그를 이용해 카메라를 이동시킬 수 있음(카메라, 대상 캔버스)
  const controls = new OrbitControls(camera, renderer.domElement);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Mesh
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "orangered",
    side: THREE.DoubleSide,
    flatShading: true, // 정점을 윤곽형태로 드러나게하기
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // geometry > attributes > position > array : 정점들의 위치([x,y,z, x,y,z, ...]) 형식으로 있음
  const posArr = geometry.attributes.position.array;
  const randomArr = []; // 애니메이션용 위치 랜덤 배열

  for (let i = 0; i < posArr.length; i += 3) {
    // 정점(Vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
    posArr[i] += (Math.random() - 0.5) * 0.2; // x
    posArr[i + 1] += (Math.random() - 0.5) * 0.2; // y
    posArr[i + 2] += (Math.random() - 0.5) * 0.2; // z

    // 랜덤하게 움직일 값을 배열에 저장
    randomArr[i] = (Math.random() - 0.5) * 0.2;
    randomArr[i + 1] = (Math.random() - 0.5) * 0.2;
    randomArr[i + 2] = (Math.random() - 0.5) * 0.2;
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime() * 3; // 경과시간
    // sin을 이용해서 애니메이션을 만듬
    // sin은 y가 1 ~ -1에서 반복되므로 꾸물(진동, 값 증가 감소 형태)거리는 애니메이션에서는 적절
    for (let i = 0; i < posArr.length; i += 3) {
      posArr[i] += Math.sin(time + randomArr[i] * 100) * 0.001; // x
      posArr[i + 1] += Math.sin(time + randomArr[i + 1] * 100) * 0.002; // y
      posArr[i + 2] += Math.sin(time + randomArr[i + 2] * 100) * 0.002; // z
    }

    // true로 해야 position 값이 증가를 업데이트 가능
    geometry.attributes.position.needsUpdate = true;
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
