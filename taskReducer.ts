import { Task, Status } from "./Types";

export type Action = 
    |   {type: 'MOVE_TASK'; payload: {id: string; status: Status}}
    |   {type: 'SET_TASKS'; payload: Task[]}
    |   {type: 'ADD_TASK'; payload: Task}
    |   {type: 'UPDATE_TASK'; payload: Task}
    |   {type: 'DELETE_TASK'; payload: {id: string}}


export function tasksReducer(
    state: Task[],
    action: Action
): Task[] {
    switch(action.type) {
        case 'SET_TASKS': {
            return action.payload
        }

        case 'ADD_TASK': {
            return [...state, action.payload]
        }

        case 'UPDATE_TASK': {
            return state.map(task => (
                task.id === action.payload.id
                ? action.payload
                : task
            ))
        }

        case "DELETE_TASK": {
            return state.filter(task => task.id !== action.payload.id)
        }

        case "MOVE_TASK": {
            const {id, status} = action.payload

            const task = state.find(t => t.id === id)
            if(!task) return state

            const remaining = state.filter(t => t.id !== id)

            const updatedTask = {...task, status}

            return [updatedTask, ...remaining]

            }

            default: return state
        }
    }
