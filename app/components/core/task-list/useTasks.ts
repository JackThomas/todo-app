import { useState, useCallback } from "react";
import { Task } from "./task.type";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = useCallback((task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    }, []);

    const removeTask = useCallback((taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }, []);

    return { tasks, addTask, removeTask };
}
