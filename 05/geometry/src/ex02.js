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
  camera.position.z = 4;
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
  // BoxGeometry의 네번째 인자는 segment로 매트리를 구성할 때 몇개의 단위로 구성할지임
  // 기본적으로 사각형은 삼각형 2개가 합쳐져 구성되지만 4번째 인자로 4로 변경하면 다르게 나옴(그림2)
  const geometry = new THREE.BoxGeometry(1, 1, 1, 4);
  const material = new THREE.MeshStandardMaterial({
    color: "hotpink",
    // wireframe: true, //뼈대만 보이게 하기

    // side: THREE.DoubleSide,
    // 확대를 통해 메쉬 내부로 들어가면 기본적으로 반댓면은 안보이는 게 기본임
    // 하지만, THREE.DoubleSide를 하면 내부 뒷면도 보이게 설정가능(그림-DoubleSide)
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

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
