'use client'

import Image from "next/image"
import whiteLogo from '@/public/whitelogo.png'
import blackLogo from '@/public/blacklogo.png'
import { useModal } from "@/Contexts/ModalProvider"

const Nav = () => {

    const {openModal} = useModal()

    return (
    <div className="bg-foreground text-background rounded-2xl px-4 py-2 my-4 mx-auto md:max-w-4xl flex gap-4 justify-between items-center">
        <div className="flex items-center">
            <Image src={blackLogo} alt="logo" className="dark:block hidden" width={50}/>
            <Image src={whiteLogo} alt="logo" className="dark:hidden block" width={50}/>
            <h1 className="text-4xl max-sm:text-3xl font-bold">KANBAN</h1>
        </div>

        <button className="px-4 py-2 font-bold dark:text-gray-600 text-white hover:cursor-pointer" onClick={openModal}>+ Add</button>
    </div>
    )
}

export default Nav