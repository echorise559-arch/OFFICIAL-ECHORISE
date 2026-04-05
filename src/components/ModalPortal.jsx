import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * ModalPortal — renders children directly into document.body via React Portal.
 * This bypasses any CSS containment on ancestor elements (overflow-x:hidden on body,
 * transforms, filters, backdrop-filters) that would otherwise break position:fixed.
 */
export default function ModalPortal({ children }) {
  const el = useRef(document.createElement('div'))

  useEffect(() => {
    const container = el.current
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, el.current)
}
