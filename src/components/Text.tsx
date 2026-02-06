import { ReactNode } from 'react'

interface TextProps {
  children: ReactNode
  as?: 'p' | 'div' | 'span'
  className?: string
  style?: React.CSSProperties
}

export default function Text({
  children,
  as: Component = 'p',
  className = '',
  style = {}
}: TextProps) {
  return (
    <Component
      className={className}
      style={{
        whiteSpace: 'pre-line',
        ...style
      }}
    >
      {children}
    </Component>
  )
}
