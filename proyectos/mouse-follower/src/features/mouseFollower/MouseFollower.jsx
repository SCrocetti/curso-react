import { useEffect, useState } from 'react'
import './MouseFollower.css'
export const MouseFollower = () => {
    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
  
    // pointer move
    useEffect(() => {
  
      const handleMove = (event) => {
        const { clientX, clientY } = event
        setPosition({ x: clientX, y: clientY })
      }
  
      if (enabled) {
        window.addEventListener('pointermove', handleMove)
      }
  
      // cleanup:
      // -> cuando el componente se desmonta
      // -> cuando cambian las dependencias, antes de ejecutar
      //    el efecto de nuevo
      return () => { // cleanup method
        console.log('cleanup')
        window.removeEventListener('pointermove', handleMove)
      }
    }, [enabled])
  
    // [] -> solo se ejecuta una vez cuando se monta el componente
    // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
    // undefined -> se ejecuta cada vez que se renderiza el componente
  
    // change body className
    useEffect(() => {
      document.body.classList.toggle('no-cursor', enabled)
  
      return () => {
        document.body.classList.remove('no-cursor')
      }
    }, [enabled])
  
    return (
      <>
        <div className="mouse-follower" style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        >
        </div>
        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Desactivar' : 'Activar'} seguir puntero
        </button>
      </>
    )
  }
  