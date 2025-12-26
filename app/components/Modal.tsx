import { useBoard } from "@/Contexts/BoardProvider"
import { useModal } from "@/Contexts/ModalProvider"
import { Priority } from "@/Types"
import { useState } from "react"

const Modal = () => {

    const {dispatch} = useBoard()
    const {closeModal} = useModal()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<Priority>('low')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(!title.trim()) return

        dispatch({
            type: 'ADD_TASK',
            payload: {
                id: crypto.randomUUID(),
                title,
                description,
                status: 'todo',
                priority,
            }
        })

        closeModal()

    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs"> 
            <div className="bg-black p-4 rounded-xl">
                <h2 className="text-4xl font-bold">Add a new task</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Insert title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full border rounded-md p-2"/>

                    <textarea 
                    placeholder="Insert Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full border rounded-md p-2" />

                    <select 
                    value={priority}
                    onChange={e => setPriority(e.target.value as Priority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <div className="flex justify-between items-center gap-2">
                        <button onClick={closeModal} className="text-center bg-foreground text-background font-bold w-full rounded-lg py-2">
                            Cancel
                        </button>

                        <button type="submit" className="text-center bg-foreground text-background font-bold w-full rounded-lg py-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal