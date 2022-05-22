// 1. import three.js
import * as THREE from "three";

// 2. 랜더러 생성
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight); // 랜더러 크기 설정
