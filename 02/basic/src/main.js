// 1. import three.js
import * as THREE from "three";

// 2. 랜더러 생성
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight); // 랜더러 크기 설정

// 3. 장면 생성(장면에는 모슨 요소가 포함됨)
const scene = new THREE.Scene();

// 4. 카메라 만들기
// PerspectiveCamera(시야각, 가로세율비율, near, far) => near < 보이는범위(+시야각내부인경우) < far
const camera = new THREE.PerspectiveCamera(
  75, // 시아갹
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // near
  1000 // far
);
camera.position.z = 5; // camera 위치를 뒤로 이동시켜야 시야 확보 가능
scene.add(camera); // camera를 scene에 추가
