
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorEffect = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hovering over interactive elements
    const handleHoverStart = () => {
      setIsHovering(true);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    // Detect mouse clicks
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "difference",
        opacity: isVisible ? 1 : 0,
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: {
          duration: 0.2,
        },
      }}
    >
      {/* Main cursor circle */}
      <motion.div
        className="relative w-8 h-8 flex items-center justify-center"
        animate={{
          rotate: isHovering ? [0, 180, 360] : 0
        }}
        transition={{
          rotate: { 
            duration: isHovering ? 3 : 0.3,
            repeat: isHovering ? Infinity : 0,
            ease: "linear"
          }
        }}
      >
        {/* Outer ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-white"
          animate={{
            scale: isHovering ? [1, 1.2, 1] : 1,
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Middle ring */}
        <motion.div 
          className="absolute w-6 h-6 rounded-full border border-white"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2
          }}
        />
        
        {/* Inner dot */}
        <motion.div 
          className="w-3 h-3 bg-white rounded-full"
          animate={{
            scale: isClicking ? 0.8 : [1, 0.9, 1],
          }}
          transition={{
            scale: {
              duration: isClicking ? 0.1 : 1.5,
              repeat: isClicking ? 0 : Infinity,
              repeatType: "reverse"
            }
          }}
        />
        
        {/* Particles effect when hovering */}
        {isHovering && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 0.8
                }}
                animate={{ 
                  x: [0, (i % 2 ? 20 : -20) * Math.sin((i + 1) * Math.PI / 3)],
                  y: [0, (i % 2 ? -20 : 20) * Math.cos((i + 1) * Math.PI / 3)],
                  opacity: [0.8, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CursorEffect;
