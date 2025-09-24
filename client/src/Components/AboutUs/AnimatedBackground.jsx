import React from 'react';
import { Shield } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-slate-900/20"></div>
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`geo-${i}`}
          className="absolute opacity-10 animate-bounce"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <Shield className="w-8 h-8 text-blue-300" />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;