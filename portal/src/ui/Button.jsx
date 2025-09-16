import { motion } from 'framer-motion'

export const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = '', 
  disabled = false,
  ...props 
}) => {
  const getButtonClass = () => {
    let baseClass = 'btn'
    
    // Add variant
    if (variant === 'outline') {
      baseClass += ' btn-outline-primary'
    } else {
      baseClass += ` btn-${variant}`
    }
    
    // Add size
    if (size) {
      baseClass += ` btn-${size}`
    }
    
    return baseClass
  }

  return (
    <motion.button
      className={`${getButtonClass()} ${className}`}
      disabled={disabled}
      whileHover={!disabled ? { 
        scale: 1.02,
        boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      style={{
        background: variant === 'primary' && !disabled 
          ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
          : undefined
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}