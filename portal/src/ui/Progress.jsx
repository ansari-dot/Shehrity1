import { motion } from 'framer-motion'

export const Progress = ({ 
  value = 0, 
  max = 100, 
  className = '', 
  color = 'primary',
  height = '8px',
  animated = true,
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={`progress ${className}`} style={{ height }} {...props}>
      <motion.div
        className={`progress-bar bg-${color}`}
        role="progressbar"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
        style={{
          background: color === 'primary' 
            ? 'linear-gradient(90deg, #007bff 0%, #0056b3 50%, #007bff 100%)'
            : undefined,
          backgroundSize: animated ? '200% 100%' : undefined,
          animation: animated ? 'progress-shimmer 2s infinite linear' : undefined
        }}
      >
        <motion.span 
          className="visually-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(percentage)}%
        </motion.span>
      </motion.div>
    </div>
  )
}