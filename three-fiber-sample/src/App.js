import "./App.css";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <mesh>
          <sphereGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
