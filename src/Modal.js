import {useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'

const modalRoot = document.getElementById('modal')

const Modal = ({children}) => {
    const elRef = useRef(null);
    //ref is a container for state that survives render cycles
    if (!elRef.current){
        elRef.current = document.createElement('div')
    }

    useEffect(()=>{
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current)
    }, [])

    return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;