import { useEffect, useRef } from 'react'

// Fades and lifts its children into view as they scroll in.
// Children with the class "reveal-item" animate one after another.
// Visitors who prefer reduced motion see everything immediately (see styles.css).
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('.reveal-item').forEach((item, i) => item.style.setProperty('--d', `${Math.min(i, 8) * 90}ms`))
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible')
            io.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
