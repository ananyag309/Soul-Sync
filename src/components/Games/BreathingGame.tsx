import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function BreathingGame() {
  const [phase, setPhase] = useState("Inhale");
  const [count, setCount] = useState(4);
  const [running, setRunning] = useState(false);
  const totalTime = phase === "Hold" ? 6 : 4;

  useEffect(() => {
    if (!running) return;
    
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          setPhase((prevPhase) => (prevPhase === "Inhale" ? "Hold" : prevPhase === "Hold" ? "Exhale" : "Inhale"));
          return phase === "Exhale" ? 4 : phase === "Hold" ? 6 : 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, phase]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white to-green-300 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Soul Sync Breathing</h1>
      <motion.div
        className="w-48 h-48 flex items-center justify-center rounded-full bg-green-100 text-green-700 text-3xl font-bold shadow-lg"
        animate={{ scale: phase === "Inhale" ? 1.3 : phase === "Exhale" ? 0.7 : 1 }}
        transition={{ duration: 4 }}
      >
        {phase}
      </motion.div>
      <p className="text-2xl mt-6 font-semibold">{count}</p>
      <Progress className="w-64 mt-4 bg-green-200" value={(count / totalTime) * 100} />
      <Button className="mt-8 px-6 py-3 text-lg bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700" onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"}
      </Button>
    </div>
  );
}
