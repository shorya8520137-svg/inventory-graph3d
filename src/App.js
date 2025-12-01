import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                {/* TEST 3D CUBE */}
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color={"hotpink"} />
                </mesh>

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
