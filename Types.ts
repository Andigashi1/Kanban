export type Status = 'todo' | 'doing' | 'done';

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
};
