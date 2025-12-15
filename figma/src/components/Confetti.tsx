import { motion } from 'motion/react';

export function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: 2 + Math.random() * 1,
    rotation: Math.random() * 360,
    color: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: `${piece.x}vw`,
            y: -20,
            rotate: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{ 
            y: '100vh',
            rotate: piece.rotation * 4,
            opacity: [1, 1, 0],
            scale: [1, 0.5]
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn'
          }}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
      
      {/* Celebration Emoji */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: [0, 1.5, 1],
          rotate: [- 180, 10, -10, 0]
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 text-8xl"
      >
        ✨
      </motion.div>
    </div>
  );
}
