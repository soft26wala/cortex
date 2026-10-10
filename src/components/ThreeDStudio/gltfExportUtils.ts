import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

/**
 * Exports Three.js scene objects into a downloadable 3D .glb file.
 */
export function exportSceneToGLB(scene: THREE.Scene, filename: string = "blender-3d-scene.glb") {
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    (gltf) => {
      let output: Blob;
      if (gltf instanceof ArrayBuffer) {
        output = new Blob([gltf], { type: "application/octet-stream" });
      } else {
        const text = JSON.stringify(gltf, null, 2);
        output = new Blob([text], { type: "application/json" });
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(output);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    (error) => {
      console.error("An error occurred while exporting GLTF/GLB:", error);
    },
    { binary: true }
  );
}
