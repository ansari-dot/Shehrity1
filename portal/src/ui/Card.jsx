import { motion } from 'framer-motion'

export const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`card border-0 shadow-sm ${className}`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header bg-transparent border-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h5 className={`card-title mb-0 ${className}`} {...props}>
      {children}
    </h5>
  )
}

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-muted mb-0 ${className}`} {...props}>
      {children}
    </p>
  )
}