'use client'

import { createContext, useContext, useReducer } from "react";
import { Task } from "../Types";
import { tasksReducer } from "@/taskReducer"
import { tasks as initialTasks} from "@/Tasks"

type BoardContextType = {
    tasks: Task[];
    dispatch: React.Dispatch<any>;
};

const BoardContext = createContext<BoardContextType | null>(null);

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
    
    return (
        <BoardContext.Provider value={{tasks, dispatch}}>
            {children}
        </BoardContext.Provider>
    )
}

export function useBoard() {
    const ctx = useContext(BoardContext);
    if (!ctx) {
        throw new Error('useBoard must be used within BoardProvider');
    }
    return ctx;
}

export default BoardProvider