import { useDroppable } from "@dnd-kit/core";
import { CircleCheckBig, CircleMinus, Clock } from "lucide-react";
import Card from "./Card";
import { Status, Task } from "@/Types";

const column: Record<Status, { title: string; color: string; textColor: string; icon: React.ElementType }> = {
    todo: {
        title: 'To Do',
        color: 'bg-[#f1f0f7] dark:bg-[#1f1a2a]',
        textColor: 'text-[#9a99a0] dark:text-[#a1a1aa]',
        icon: CircleMinus
    },
    doing: {
        title: 'In progress',
        color: 'bg-[#eef3ff] dark:bg-[#1e2133]',
        textColor: 'text-[#6b84d7] dark:text-[#8fa3ff]',
        icon: Clock
    },
    done: {
        title: 'Completed',
        color: 'bg-[#e5f6f3] dark:bg-[#102b26]',
        textColor: 'text-[#04783c] dark:text-[#4ade80]',
        icon: CircleCheckBig
    }
};

const Column = ({status, tasks} : {status : Status, tasks: Task[]}) => {

    const { setNodeRef } = useDroppable({id: status})
    const { title, color, textColor, icon: Icon } = column[status];

    return (
        <div className="space-y-4">
            <span className={`flex gap-2 ${color} font-bold w-fit px-1 py-0.5 rounded-sm text-white`}>
                <Icon className={`${textColor}`}/>
                <p className={`${textColor}`}>{title}</p>
            </span>

            <div ref={setNodeRef} className={`${color} p-2 rounded-lg space-y-3`}>
                {tasks.map(task => (
                    <Card key={task.id} task={task}/>
                ))}
            </div>
        </div>
    );
};

export default Column;