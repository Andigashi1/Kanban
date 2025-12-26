'use client'

import { createContext, useContext, useState } from "react"

type ModalContextType = {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

const ModalProvider = ({ children }: { children: React.ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
    <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
        {children}
    </ModalContext.Provider>
    )
}

export function useModal() { 
    const ctx = useContext(ModalContext)
    if(!ctx) {
        throw new Error("useModal should be used within ModalProvider")
    }
    return ctx
}

export default ModalProvider