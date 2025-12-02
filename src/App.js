import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useEffect, useState } from "react";

function Bar({ x, height, name, value }) {
    return (
        <group position={[x, 0, 0]}>
            {/* 3D Bar */}
            <mesh position={[0, height / 2, 0]}>
                <boxGeometry args={[1, height, 1]} />
                <meshStandardMaterial color={"#4f83ff"} />
            </mesh>

            {/* Username below bar */}
            <Text
                position={[0, -0.8, 0]}
                fontSize={0.35}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {name}
            </Text>

            {/* Revenue above bar */}
            <Text
                position={[0, height + 0.4, 0]}
                fontSize={0.30}
                color="yellow"
                anchorX="center"
                anchorY="middle"
            >
                ₹{value}
            </Text>
        </group>
    );
}

export default function App() {
    const [data, setData] = useState([]);
    const [maxValue, setMaxValue] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    "https://13-201-222-24.nip.io/api/graph/revenue?range=monthly"
                );
                const json = await res.json();

                if (json.success) {
                    setData(json.data);

                    const max = Math.max(...json.data.map(d => d.revenue));
                    setMaxValue(max === 0 ? 1 : max);
                }
            } catch (err) {
                console.error("API Error:", err);
            }
        }

        fetchData();
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
            <Canvas camera={{ position: [6, 6, 10], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />

                {/* Make bars based on API data */}
                {data.map((item, i) => (
                    <Bar
                        key={i}
                        x={i * 2 - 3}           // spacing between bars
                        height={(item.revenue / maxValue) * 5 || 0.3}  // normalized bar height
                        name={item.name}
                        value={item.revenue}
                    />
                ))}

                <OrbitControls />
            </Canvas>
        </div>
    );
}
