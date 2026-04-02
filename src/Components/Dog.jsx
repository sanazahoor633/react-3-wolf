import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as Three from "three";
import { BoxGeometry, MeshBasicMaterial } from "three";
import {
  OrbitControls,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { normalMap, texture } from "three/tsl";
const Dog = () => {
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

  const model = useGLTF("/models/dog.drc.glb");
  const dogModel = useRef(model);
  useThree(({ camera, scene, gl }) => {
    // console.log(camera.position);
    camera.position.z = 0.55;
    gl.toneMapping = Three.ReinhardToneMapping;
    gl.outputColorSpace = Three.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = Three.SRGBColorSpace;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "/branches_normals.jpeg",
  ]).map((texture) => {
    ((texture.flipY = true), (texture.colorSpace = Three.SRGBColorSpace));
    return texture;
  });
  //my code
  const [
    mt1,
    mt2,
    mt3,
    mt4,
    mt5,
    mt6,
    mt7,
    mt8,
    mt9,
    mt10,
    mt11,
    mt12,
    mt13,
    mt14,
    mt15,
    mt16,
    mt17,
    mt18,
    mt19,
  ] = useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-3.png",
    "/matcap/mat-4.png",
    "/matcap/mat-5.png",
    "/matcap/mat-6.png",
    "/matcap/mat-7.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-14.png",
    "/matcap/mat-15.png",
    "/matcap/mat-16.png",
    "/matcap/mat-17.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
  ]).map((texture) => {
    texture.colorSpace = Three.SRGBColorSpace;
    return texture;
  });

  const material = useRef({
    uMatcap1: { value: mt19 },
    uMatcap2: { value: mt2 },
    uProgress: { value: 1.0 },
  });

  const dogMaterial = new Three.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new Three.MeshMatcapMaterial({
    map: branchMap,
    normalMap: branchNormalMap,
  });
  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      // console.log(child.name);
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });
  //my code
  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // Store reference to shader uniforms for GSAP animation

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `,
    );
  }

  dogMaterial.onBeforeCompile = onBeforeCompile;
  useEffect(() => {
    document
      .querySelector(`.title[image-title="tomorrow"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt19;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="navy"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="chicago"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt9;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="louises"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt12;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="festival"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt10;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[image-title="kennedy"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[image-title="opera"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt13;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[image-title="revelator"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt15;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[image-title="bouguessa"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mt7;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document.querySelector(`.titles`).addEventListener("mouseleave", () => {
      material.current.uMatcap1.value = mt2;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 0.3,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
      },
    });
    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.25",
    })
      .to(dogModel.current.scene.rotation, {
        x: `+=${Math.PI / 15}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
        },
        "third",
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.5",
          z: "+=0.6",
          y: "-=0.2",
        },
        "third",
      );
  }, []);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 3.9, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Dog;
