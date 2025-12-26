'use client'

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { useState, useMemo } from "react"
import Column from "./components/Column"
import { useBoard } from "@/Contexts/BoardProvider"
import { useModal } from "@/Contexts/ModalProvider"
import Modal from "./components/Modal"
import { Status, Task } from '@/Types'
import Card from './components/Card'


const Page = () => {

  const {tasks, dispatch} = useBoard()
  const {isOpen} = useModal()

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const tasksByStatus = useMemo(() => ({
    todo: tasks.filter(t => t.status === 'todo'),
    doing: tasks.filter(t => t.status === 'doing'),
    done: tasks.filter(t => t.status === 'done')
  }), [tasks])

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    dispatch({
      type: 'MOVE_TASK',
      payload: {
        id: active.id as string,
        status: over.id as Status
      }
    })
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex justify-between items-cente gap-8 max-w-4xl mx-auto *:w-full">
        <Column status="todo" tasks={tasksByStatus.todo}/>
        <Column status="doing" tasks={tasksByStatus.doing}/>
        <Column status="done" tasks={tasksByStatus.done}/>
      </div>

      <DragOverlay>
        {activeTask ? <Card task={activeTask} isOverlay /> : null}
      </DragOverlay>

      {isOpen && <Modal/>}
    </DndContext>
  )
}

export default Page