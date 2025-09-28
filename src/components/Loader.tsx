import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppleHelloEnglishEffect from "./ui/keshavAnimation";

type LoaderProps = {
  onLoadingComplete: () => void;
};

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [show, setShow] = useState(true);  // Controls if the loader is shown
  const [isLoaded, setIsLoaded] = useState(false);  // Track if the animation is completed

  // Handle animation completion
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
    setIsLoaded(true);  // Mark animation as complete
    document.body.style.cursor = "auto";  // Reset cursor to default
  };

  // Set up initial cursor state
  useEffect(() => {
    document.body.style.cursor = "wait";  // Show loading cursor

    // Cleanup cursor when component unmounts
    return () => {
      document.body.style.cursor = "auto";  // Reset cursor if unmounted
    };
  }, []);

  // Once the animation is complete, fade out the loader
  useEffect(() => {
    if (isLoaded) {
      setShow(false);  // Hide the loader after animation
    }
  }, [isLoaded]);

  // Trigger onLoadingComplete once the loader disappears
  useEffect(() => {
    if (!show && isLoaded) {
      onLoadingComplete();  // Notify parent component that loading is complete
    }
  }, [show, isLoaded, onLoadingComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="h-screen w-full flex justify-center items-center">
          <AppleHelloEnglishEffect
            speed={1}  // You can control the speed here
            onAnimationComplete={handleAnimationComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
