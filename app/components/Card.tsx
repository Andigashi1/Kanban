import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/Types'
import { Calendar, Flag, UserPen } from 'lucide-react'

const priorityStyles = {
    low: 'border-green-400',
    medium: 'border-yellow-400',
    high: 'border-red-400'
}

const Card = ({task, isOverlay = false} : {task: Task, isOverlay?: boolean}) => {

    const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id })

    const style = {
    transform: CSS.Translate.toString(transform),
    }

    return (
    <div
    ref={!isOverlay ? setNodeRef : undefined}
        {...(!isOverlay ? listeners : {})}
        {...(!isOverlay ? attributes : {})} 
    style={style}
    className={`bg-white text-black p-2 rounded-md space-y-2 border-l-4 
            ${isOverlay && 'shadow-xl cursor-grabbing'} 
            ${isDragging && 'opacity-50'} 
            ${priorityStyles[task.priority]}`}>
        <p className='font-bold text-lg tracking-wide'>{task.title}</p>
        <p className='text-gray-500 text-sm'>{task.description}</p>

        <div className='flex gap-2 border-t-2 border-gray-500 pt-2'>
            <UserPen/>
            <Calendar/>
            <Flag/>
        </div>
    </div>
    )
}

export default Card