// 1. import three.js
import * as THREE from "three";

// 2. 랜더러 생성
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 랜더러 크기 설정
document.body.appendChild(renderer.domElement); // 랜더러가 가진 canvas요소(renderer.domElement)를 body에 자식으로 추가
